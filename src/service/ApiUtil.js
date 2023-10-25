import LocalStorageService from "./LocalStorageService";

export default class ApiUtil {
    //static _apiPath = "http://192.168.0.109:8088";
    static _apiPath = "https://dachnik-api.online";

    static prepareHeaders = (contentType = false, authorization = false) => {
        return {
            headers: {
                ...contentType ? {'Content-Type': 'application/json;charset=utf-8'} : {},
                ...authorization ? {'Authorization': `Bearer ${LocalStorageService.getSecurityToken()}`} : {}
            }
        };
    };

    static async executeRequest(url, params) {
        const res = await fetch(url, {...params});

        if (!res.ok) {
            if (res.status === 401) {
                LocalStorageService.removeSecurityToken();
            }
            throw new Error(`${url} ${res.status}`);
        }
        return await res.json();
    }

    static async getProfile() {
        return await this.executeRequest(`${this._apiPath}/api/profile`, {
            ...this.prepareHeaders(false, true)
        });
    };

    static async getIntegrationSettings() {
        return await this.executeRequest(`${this._apiPath}/api/integration-settings`, {
            ...this.prepareHeaders(false, true)
        });
    };

    static async whiteLabelRegistration(whiteLabel) {
        return await this.executeRequest(`${this._apiPath}/api/white-label-registration`, {
            method: 'POST',
            ...this.prepareHeaders(true),
            body: JSON.stringify({
                ...whiteLabel
            })
        });
    };

    static async oneFactorLogin(username, password) {
        return await this.executeRequest(`${this._apiPath}/api/security/one-factor-login`, {
            method: 'POST',
            ...this.prepareHeaders(true),
            body: JSON.stringify({
                username, password
            })
        });
    };

    static async twoFactorLogin(requestId, code) {
        return await this.executeRequest(`${this._apiPath}/api/security/two-factor-login`, {
            method: 'POST',
            ...this.prepareHeaders(true),
            body: JSON.stringify({
                requestId, code
            })
        });
    };

    static async updateAvatar(base64) {
        return await this.executeRequest(`${this._apiPath}/api/profile/avatar`, {
            method: 'PUT',
            ...this.prepareHeaders(true, true),
            body: JSON.stringify({
                base64
            })
        });
    };

    static async deleteAvatar() {
        return await this.executeRequest(`${this._apiPath}/api/profile/avatar`, {
            method: 'DELETE',
            ...this.prepareHeaders(true, true)
        });
    };

    static async updateProfile(firstName, lastName) {
        return await this.executeRequest(`${this._apiPath}/api/profile`, {
            method: 'PUT',
            ...this.prepareHeaders(true, true),
            body: JSON.stringify({
                firstName, lastName
            })
        });
    };

    static async updatePassword(currentPassword, newPassword) {
        return await this.executeRequest(`${this._apiPath}/api/profile/update-password`, {
            method: 'PUT',
            ...this.prepareHeaders(true, true),
            body: JSON.stringify({
                currentPassword, newPassword
            })
        });
    };

    static async getGoogleAuthenticatorQRCode() {
        return await this.executeRequest(`${this._apiPath}/api/security-settings/qrcode`, {
            ...this.prepareHeaders(false, true)
        });
    }

    static async enableGoogleAuthenticatorQRCode(code) {
        return await this.executeRequest(`${this._apiPath}/api/security-settings/enable-qrcode`, {
            method: 'POST',
            ...this.prepareHeaders(true, true),
            body: JSON.stringify({
                code
            })
        });
    }

    static async disableGoogleAuthenticatorQRCode(code) {
        return await this.executeRequest(`${this._apiPath}/api/security-settings/disable-qrcode`, {
            method: 'POST',
            ...this.prepareHeaders(true, true),
            body: JSON.stringify({
                code
            })
        });
    }

    static async getDashboardLeadsKpiDetails(from, to, pipelineId) {
        const preparedParam = `from=${from}&to=${to}&pipelineId=${pipelineId}`;
        return await this.executeRequest(`${this._apiPath}/api/dashboard/leads-kpi-details?${preparedParam}`, {
            ...this.prepareHeaders(false, true)
        });
    }

    static async getDashboardLeadsKpiDetailsDay(from, to, pipelineId) {
        const preparedParam = `from=${from}&to=${to}&pipelineId=${pipelineId}`;
        return await this.executeRequest(`${this._apiPath}/api/dashboard/leads-kpi-details-day?${preparedParam}`, {
            ...this.prepareHeaders(false, true)
        });
    }

    static async getDashboardLeadsItems(from, to, pipelineId) {
        const preparedParam = `from=${from}&to=${to}&pipelineId=${pipelineId}`;
        return await this.executeRequest(`${this._apiPath}/api/dashboard/leads-items?${preparedParam}`, {
            ...this.prepareHeaders(false, true)
        });
    }

    static async getDashboardPipelineInfo(from, to, pipelineId) {
        const preparedParam = `from=${from}&to=${to}&pipelineId=${pipelineId}`;
        return await this.executeRequest(`${this._apiPath}/api/dashboard/pipeline-info?${preparedParam}`, {
            ...this.prepareHeaders(false, true)
        });
    }

    static async getDashboardDealsInfo(from, to, pipelineId) {
        const preparedParam = `from=${from}&to=${to}&pipelineId=${pipelineId}`;
        return await this.executeRequest(`${this._apiPath}/api/dashboard/deals-info?${preparedParam}`, {
            ...this.prepareHeaders(false, true)
        });
    }

    static async getPipelineDetails() {
        return await this.executeRequest(`${this._apiPath}/api/entity/pipeline-details`, {
            ...this.prepareHeaders(false, true)
        });
    }

    static async getDropdownValues() {
        return await this.executeRequest(`${this._apiPath}/api/dashboard/dropdown-values`, {
            ...this.prepareHeaders(false, true)
        });
    }

    static async getDashboardStatusInfo(from, to, pipelineId, userId) {
        const preparedParam = `from=${from}&to=${to}`
            + (pipelineId ? `&pipelineId=${pipelineId}` : '')
            + (userId ? `&userId=${userId}` : '');
        return await this.executeRequest(`${this._apiPath}/api/dashboard/status-info?${preparedParam}`, {
            ...this.prepareHeaders(false, true)
        });
    }

    static async searchLeadInfo(from, to, page, pageSize, searchValue, pipelineId, pipelineStatusId) {
        const preparedParam = `from=${from}&to=${to}`
            + `&page=${page}`
            + `&pageSize=${pageSize}`
            + (searchValue ? `&searchValue=${searchValue}` : '')
            + (pipelineId ? `&pipelineId=${pipelineId}` : '')
            + (pipelineStatusId ? `&pipelineStatusId=${pipelineStatusId}` : '');
        return await this.executeRequest(`${this._apiPath}/api/dashboard/lead-search?${preparedParam}`, {
            ...this.prepareHeaders(false, true)
        });
    }

    static async invokeIntegrationApiPath(apiPath) {
        return await this.executeRequest(`${this._apiPath}${apiPath}`, {
            ...this.prepareHeaders(false, true)
        });
    }
}