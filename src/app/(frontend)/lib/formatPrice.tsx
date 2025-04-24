
export const formatPrice = (price: number) => {
    const priceFormated = new Intl.NumberFormat('en-US', {
        maximumSignificantDigits: 3,
        style: "currency",
        currency: "USD"
    })
    const finalPrice = priceFormated.format(price)
    return finalPrice
}
