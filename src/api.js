export const fetchCompanies = async () => {
    const response = await fetch('http://localhost:3000/api/companies');
    return await response.json();
};

export const fetchProjects = async (companyId) => {
    const response = await fetch(`http://localhost:3000/api/projects?company_id=${companyId}`);
    return await response.json();
};

export const fetchContractors = async (companyId) => {
    const response = await fetch(`http://localhost:3000/api/contractors?company_id=${companyId}`);
    return await response.json();
};

export const fetchAccounts = async (companyId) => {
    const response = await fetch(`http://localhost:3000/api/accounts?company_id=${companyId}`);
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
};
