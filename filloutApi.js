const getFilloutData = async(params) => {
    const token = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';
    const url = 'https://api.fillout.com/v1/api/forms/cLZojxk94ous/submissions';
    let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
    }).then(result => result.json());

    return response;
}

export default getFilloutData;