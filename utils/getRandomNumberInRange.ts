export function getRandomNumberInRange(min: number, max: number): number {
    if (min > max) {
        throw new Error("min must be less than or equal to max");
    }

    return Math.random() * (max - min) + min;
}