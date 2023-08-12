const companies = require("./companies.json");
const users = require("./users.json");
const fs = require('fs')

const companies_list = companies.map(singleCompany => {

    let users_with_email_true = users.filter(user => singleCompany.id == user.company_id && user.email_status)
    let users_with_email_false = users.filter(user => singleCompany.id == user.company_id && !user.email_status)

    const users_true  = users_with_email_true.map(rec => {
        return {
            "info": rec.first_name.concat(`, ${rec.last_name}, ${rec.email}`),
            "Previous Token Balance": rec.tokens,
            "New Token Balance": rec.active_status ? rec.tokens + singleCompany.top_up : rec.tokens
        }
    })

    const users_false  = users_with_email_false.map(rec => {
        return {
            info: rec.first_name.concat(`, ${rec.last_name}, ${rec.email}`),
            "Previous Token Balance": rec.tokens,
            "New Token Balance": rec.active_status ? rec.tokens + singleCompany.top_up : rec.tokens
        }
    })


    return {
        "Company Id": singleCompany.id,
        "Company Name": singleCompany.name,
        "Users Emailed": users_true,
        "Users Not Emailed": users_false
    }

})

const data = companies_list.reduce((a, b) => a + require("util").inspect (b) + "\n", "");
fs.writeFileSync ("Output.txt", data);