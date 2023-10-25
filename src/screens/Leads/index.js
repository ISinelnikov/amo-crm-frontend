import React, {useEffect, useState} from "react";
import styles from "./Leads.module.css";
import cn from "classnames";
import Dropdown from "../../components/Dropdown";
import DatePickerInterval from "../../components/DatePicker/DatePickerInterval";
import Card from "../../components/Card";
import {formatInterval} from "../../service/DateService";
import ApiUtil from "../../service/ApiUtil";
import LeadRow from "./LeadRow";
import CSVLoader from "../../components/CSVLoader";
import SearchInput from "../../components/SearchInput";
import Pagination from "../../components/Pagination";

const filters = [
    {
        value: 10,
        name: 'Записей на странице: 10'
    },
    {
        value: 50,
        name: 'Записей на странице: 50'
    },
    {
        value: 100,
        name: 'Записей на странице: 100'
    },
];

const headers = [
    {label: "Сделка", key: "leadId"},
    {label: "Название", key: "name"},
    {label: "Адрес", key: "link"},
    {label: "Дата создания", key: "createdDate"},
    {label: "Воронка", key: "pipeline"},
    {label: "Статус", key: "status"},
    {label: "Источник", key: "source"},
    {label: "Наличие квалификации", key: "qualifiedTooltip"},
    {label: "Состояние", key: "closedTooltip"},
    {label: "Причина отказа", key: "rejectReason"}
];

const Leads = () => {
    const [pipelineFilter, setPipelineFilter] = useState({
        activePipelineId: null,
        activePipelineStatusId: null
    });

    const [interval, setInterval] = useState({});

    const [data, setData] = useState({
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: []
    });

    const [pipelineDetails, setPipelineDetails] = useState({
        pipelines: [],
        pipelineIdToStatuses: {}
    });

    const [searchValue, setSearchValue] = useState('');

    const [searchValueFilter, setSearchValueFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(filters[0].value);

    const handleSubmitSearchInput = () => {
        setSearchValueFilter(searchValue);
    };

    const statuses = () => {
        if (pipelineFilter.activePipelineId) {
            return pipelineDetails.pipelineIdToStatuses[pipelineFilter.activePipelineId];
        }
        return [];
    }

    const findActivePipeline = () => pipelineDetails
        .pipelines
        .find(pipeline => pipeline.pipelineId === pipelineFilter.activePipelineId);
    const findActiveStatus = () => statuses()
        .find(status => status.statusId === pipelineFilter.activePipelineStatusId);

    const prepareCsvName = () => {
        const find = findActivePipeline();
        const {from, to} = formatInterval(interval);
        return `leads`
            + `-${find ? `-${find.name}` : ''}`
            + `-${from}`
            + `-${to}`
            + `.csv`;
    }

    useEffect(() => {
        const {from, to} = formatInterval(interval);
        ApiUtil.searchLeadInfo(
            from, to,
            currentPage,
            pageSize,
            searchValue,
            pipelineFilter.activePipelineId ? pipelineFilter.activePipelineId : null,
            pipelineFilter.activePipelineStatusId ? pipelineFilter.activePipelineStatusId : null
        ).then(body => {
            setData(body);
        }).catch(error => {
            console.log(error);
        });
    }, [currentPage, pageSize, searchValueFilter, pipelineFilter, interval]);

    useEffect(() => {
        if (!searchValue) {
            setSearchValueFilter('');
        }
    }, [searchValue]);

    useEffect(() => {
        ApiUtil.getPipelineDetails()
            .then(body => {
                setPipelineDetails(body);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Card
            className={styles.card}
            title="Поиск по сделкам"
            classTitle={cn("title-purple", styles.title)}
            classCardHead={cn(styles.head)}
            head={
                <div className={styles.filter}>
                    <CSVLoader headers={headers} data={data.items} filename={prepareCsvName()}/>
                    <DatePickerInterval onChange={setInterval}/>
                    <SearchInput
                        value={searchValue}
                        setValue={setSearchValue}
                        onSubmit={handleSubmitSearchInput}
                        placeholder="Идентификатор или название сделки"
                        type="text"
                        name="search"
                        icon="search"
                    />
                    <Dropdown
                        className={cn(styles.dropdown, "mobile-hide")}
                        value={findActivePipeline()}
                        setValue={value => {
                            setPipelineFilter({
                                activePipelineId: value ? value.pipelineId : null,
                                activePipelineStatusId: null
                            })
                        }}
                        emptyValue={true}
                        placehodler={'Воронка продаж'}
                        options={pipelineDetails.pipelines}
                        small
                    />
                    <Dropdown
                        className={cn(styles.dropdown, "mobile-hide")}
                        value={findActiveStatus()}
                        setValue={value => {
                            setPipelineFilter({
                                activePipelineId: pipelineFilter.activePipelineId,
                                activePipelineStatusId: value ? value.statusId : null
                            })
                        }}
                        emptyValue={true}
                        disabled={pipelineFilter.activePipelineId === null}
                        placehodler={'Статус в воронке'}
                        options={statuses(pipelineFilter.activePipelineId)}
                        small
                    />
                    <Dropdown
                        className={cn(styles.dropdown, "mobile-hide")}
                        value={filters[0]}
                        setValue={value => {
                            setPageSize(value.value)
                        }}
                        placehodler={'Записей на странице'}
                        options={filters}
                        small
                    />
                </div>
            }
        >
            <Pagination onPageChange={value => setCurrentPage(value)}
                        totalCount={data.totalCount} currentPage={currentPage}
                        pageSize={pageSize}/>
            <div className={cn(styles.row)}>
                <LeadRow rows={data.items}/>
            </div>
            <Pagination onPageChange={value => setCurrentPage(value)}
                        totalCount={data.totalCount} currentPage={currentPage}
                        pageSize={pageSize}/>
        </Card>
    );
};

export default Leads;
