const SECURITY_TOKEN = 'securityToken';

export default class LocalStorageService {
    static getSecurityToken() {
        return localStorage.getItem(SECURITY_TOKEN);
    }

    static setSecurityToken(securityToken) {
        localStorage.setItem(SECURITY_TOKEN, securityToken);
    }

    static removeSecurityToken() {
        localStorage.removeItem(SECURITY_TOKEN);
    }
}