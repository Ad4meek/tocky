async function createUser(formData) {
    const req = await fetch("http://localhost:3000/users/register", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
    });

    const data = await req.json();

    return {
        status: req.status,
        payload: data.payload,
        msg: data.msg,
    };
}

async function loginUser(formData) {
    const req = await fetch("http://localhost:3000/users/login", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
    });
    const data = await req.json();

    return {
        status: req.status,
        data: data.data
    };
}

async function logoutUser() {
    const req = await fetch("http://localhost:3000/users/logout", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
    });

    return {
        status: req.status,
    };
}

async function getUserMoney(userId) {
    const req = await fetch(`http://localhost:3000/users/money/${userId}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "GET"
    });
    const data = await req.json();

    return {
        status: req.status,
        data: data.data
    };
}

export { createUser, loginUser, logoutUser, getUserMoney };
