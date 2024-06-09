import { getUserMoney } from "../../models/User";

async function getMoney({
    userUniqueId
}){
    if(!userUniqueId) throw new Error(404);

    const moneyInfo = await getUserMoney(userUniqueId);

    if(!moneyInfo) throw new Error(404);

    return moneyInfo.data.money;
}



export {
    getMoney
}