// utility functions for login, logout, etc

// logout code
export const logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem("jwt_access_token");
    // clear everything in the localStorage
    localStorage.removeItem("username");
    sessionStorage.clear();
};
