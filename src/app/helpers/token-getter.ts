export function tokenGetterFunction() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser).token;
    }
    return null;
  }
  