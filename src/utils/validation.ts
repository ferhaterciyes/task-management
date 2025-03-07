export const validateTCKimlikNo = (tcno: string): boolean => {
    if (tcno.length !== 11) return false;
    if (tcno[0] === '0') return false;
    if (!/^[0-9]+$/.test(tcno)) return false;

    const digits = tcno.split('').map(Number);
    
    // 1, 3, 5, 7, 9. hanelerin toplamının 7 katından, 2, 4, 6, 8. hanelerin toplamı çıkartıldığında,
    // elde edilen sonucun 10'a bölümünden kalan, yani Mod10'u bize 10. haneyi verir.
    const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
    
    const step1 = oddSum * 7 - evenSum;
    const step2 = step1 % 10;
    
    if (step2 !== digits[9]) return false;
    
    // 1'den 10'uncu haneye kadar olan rakamların toplamından elde edilen sonucun
    // 10'a bölümünden kalan, bize 11'inci haneyi verir.
    const sum = digits.slice(0, 10).reduce((acc, curr) => acc + curr, 0);
    const lastDigit = sum % 10;
    
    return lastDigit === digits[10];
}; 