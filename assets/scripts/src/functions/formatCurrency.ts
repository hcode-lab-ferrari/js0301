export default function formatCurrency(value: number) {

    return Number(value).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    });

}