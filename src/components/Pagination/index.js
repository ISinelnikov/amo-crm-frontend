import React from 'react';
import {usePagination, DOTS} from './usePagination';
import styles from './Pagination.module.css';
import cn from "classnames";
import Icon from "../Icon";

const Pagination = ({
                        onPageChange,
                        totalCount,
                        siblingCount = 1,
                        currentPage,
                        pageSize,
                        className
                    }) => {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <>
            <div className={styles.pagination}>
                <div className={styles.container}>
                    {`Записей на странице: ${pageSize}`}
                </div>
                <div className={styles.container}>
                    {
                        currentPage !== 1 &&
                        <div className={styles.item} onClick={onPrevious}>
                            <Icon name="arrow-left" size="18"/>
                        </div>
                    }

                    {paginationRange.map((pageNumber, index) => {
                            if (pageNumber === DOTS) {
                                return (
                                    <div className={styles.item} key={index}>
                                        &#8230;
                                    </div>
                                )
                            }

                            return (
                                <div className={cn(styles.item, {[styles.current]: pageNumber === currentPage})}
                                     onClick={() => onPageChange(pageNumber)}
                                     key={index}
                                >
                                    {pageNumber}
                                </div>
                            )
                        }
                    )}

                    {
                        currentPage !== lastPage &&
                        <div className={styles.item} onClick={onNext}>
                            <Icon name="arrow-right" size="18"/>
                        </div>
                    }
                </div>
                <div className={styles.container}>
                    {`Записей найдено: ${totalCount}`}
                </div>
            </div>
        </>
    )
}

export default Pagination;
