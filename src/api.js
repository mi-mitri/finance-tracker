
export const fetchCompanies = async () => {
    const response = await fetch('http://localhost:3000/api/companies');
    return await response.json();
};

export const fetchProjects = async (companyId) => {
    const response = await fetch(`http://localhost:3000/api/projects?company_id=${companyId}`);
    return await response.json();
};

export const fetchContractors = async () => {
    const response = await fetch('http://localhost:3000/api/contractors');
    return await response.json();
};

export const fetchAccounts = async (companyId) => {
    const response = await fetch(`http://localhost:3000/api/accounts?company_id=${companyId}`);
    return await response.json();
};
