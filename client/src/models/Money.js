async function getUserMoney(userId) {
    const req = await fetch(`http://localhost:3000/money/${userId}`, {
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

async function depositUserMoney(userId, formData) {
    const req = await fetch(`http://localhost:3000/money/${userId}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData)
    });
    const data = await req.json();

    window.location.replace(data.data.payment_url);
}

async function getDepositAmount(depositId) {
    const req = await fetch(`http://localhost:3000/money/amount/${depositId}`, {
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
    }
}

async function removeAmountMoney(amount, userId) {
    const req = await fetch(`http://localhost:3000/money/remove`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            amount,
            uniqueId: userId
        })
    });

    return {
        status: req.status,
    }
}

async function addAmountMoney(amount, userId) {
    const req = await fetch(`http://localhost:3000/money/add`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            amount,
            uniqueId: userId
        })
    });

    return {
        status: req.status,
    }
}


export {
    getUserMoney,
    depositUserMoney,
    getDepositAmount,
    removeAmountMoney,
    addAmountMoney
}