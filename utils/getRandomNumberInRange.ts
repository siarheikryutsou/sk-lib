export function getRandomNumberInRange(min: number, max: number, roundMethod?: (value: number) => number): number {
    if (min > max) {
        throw new Error("min must be less than or equal to max");
    }

    const result = Math.random() * (max - min) + min;
    return typeof roundMethod === "function" ? roundMethod(result) : result;
}