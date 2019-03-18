export const add = (data) => {
    console.log('inside reducers..', data);
    return ({
        type: 'ADD',
        counter: data
    })
}