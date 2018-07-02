

module.exports.calculationMethod = (salary, rate, callback) => {
    const calculatedPrices = {};

    calculatedPrices.grossIncome = salary/12;

    /*========= salary and rate should be positive =========*/
    if(salary <= 0 || rate < 0) {
        return callback('annualSalary and superRate cannot be negative')
    }

    /*========= income tax calculation according to salary =========*/
    if(salary >=0 && salary<=18200) {
        calculatedPrices.incomeTax = 0
    } 
    
    if (salary <= 37000 && salary>=18201) {
        calculatedPrices.incomeTax = ((0.19  * (salary - 18200)))/12;
    } 
    
    if (salary <= 87000 && salary>=37001) {
        calculatedPrices.incomeTax = (3572  + (0.325  * (salary- 37000)))/12;
    } 
    
    if (salary <= 180000 && salary >= 87001) {
        calculatedPrices.incomeTax = (19822 + (0.37  * (salary- 87000)))/12;
    } 
    
    if (salary >= 180001 ) {
        calculatedPrices.incomeTax = (54232 + (0.45  * (salary- 180000)))/12;
    }

    calculatedPrices.netIncome =  (calculatedPrices.grossIncome - calculatedPrices.incomeTax);
    calculatedPrices.superAmount = (calculatedPrices.grossIncome * (rate/100));

    callback(null, calculatedPrices)
}