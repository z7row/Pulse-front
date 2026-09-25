export function formatNumber(number: number | undefined | null) {
        if (number === undefined || number === null || isNaN(number)) {
            return "0";
        }

        if (number >= 1000) {
            return (number / 1000).toFixed(1) + "k";
        }

        return number.toString();
    }
