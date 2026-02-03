document.addEventListener('DOMContentLoaded', () => {
    сalculator()
})

function сalculator() {
    /* Находим главный элемент, если его нет, то return */
    const calculator = document.querySelector('[data-js="calculator"]')

    if(!calculator) return

    /* Основные блоки */
    const calculatorForm = calculator.querySelector('[data-js="calculatorForm"]')
    const finalContainer = calculator.querySelector('[data-js="finalContainer"]')

    /* Начальные значения */
    const exchangeRatesRubCny = 12.58
    const nominalElectricalPower = 1100
    const amount = 1
    const gasPrice = 6.0
    const priceElectricity = 6.0
    const priceThermalEnergy = 1500.0

    /* Находим все поля формы*/
    const exchangeRatesRubCnyField = calculator.querySelector('[id="exchangeRatesRubCny"]')
    const nominalElectricalPowerField = calculator.querySelector('[id="nominalElectricalPower"]')
    const amountField = calculator.querySelector('[id="amount"]')
    const gasPriceField = calculator.querySelector('[id="gasPrice"]')
    const priceElectricityField = calculator.querySelector('[id="priceElectricity"]')
    const priceThermalEnergyField = calculator.querySelector('[id="priceThermalEnergy"]')
    const userNameField = calculator.querySelector('[id="userName"]')
    const companyNameField = calculator.querySelector('[id="companyName"]')
    const userPhoneField = calculator.querySelector('[id="userPhone"]')
    const userEmailField = calculator.querySelector('[id="userEmail"]')
    const userCommentField = calculator.querySelector('[id="userComment"]')

    /* Предзаполнение полей */
    exchangeRatesRubCnyField.value = exchangeRatesRubCny
    nominalElectricalPowerField.value = nominalElectricalPower
    amountField.value = amount
    gasPriceField.value = gasPrice
    priceElectricityField.value = priceElectricity
    priceThermalEnergyField.value = priceThermalEnergy

    function privacyCheckboxValidate() {
        const privacyCheckboxEl = calculator.querySelector('[id="customPrivacyCheckbox"]')

        if (privacyCheckboxEl.checked) {
            privacyCheckboxEl.classList.remove('error')
            return true
        } else {
            privacyCheckboxEl.classList.add('error')
            return false
        }
    }

    /* Обработка кнопок исполнения */
    let execution = "open"
    let executionRadios = calculator.querySelectorAll('[data-js="exacutionRadio"]')
    let heatRecoveryEls = calculator.querySelectorAll('[data-js="heatRecoveryEl"]')

    executionRadios.forEach(item => {
        item.addEventListener('change', function() {
            execution = this.value

            if(execution == 'containerHeatRecovery') {
                heatRecoveryEls.forEach(el => {
                    el.classList.remove('hiddenBlock')
                })
            } else {
                heatRecoveryEls.forEach(el => {
                    el.classList.add('hiddenBlock')
                })
            }
        })
    })

    /* Обработка кнопок сезонности применения */
    let useThermalEnergy = "heatingSeason"
    let useThermalRadios = calculator.querySelectorAll('[data-js="useThermalRadio"]')
    useThermalRadios.forEach(item => {
        item.addEventListener('change', function() {
            useThermalEnergy = this.value
        })
    })

    let exchangeRatesRubCnyValue = parseFloat(
        exchangeRatesRubCnyField.value.toString().replace(/[^\.\d]/g, "")
    )

    let amountValue = parseFloat(amountField.value.toString().replace(/\D/g, ""))

    let gasPriceValue = parseFloat(
        gasPriceField.value.toString().replace(/[^\.\d]/g, "")
    )

    let priceElectricityValue = parseFloat(
        priceElectricityField.value.toString().replace(/[^\.\d]/g, "")
    )

    let priceThermalEnergyValue = parseFloat(
        priceThermalEnergyField.value.toString().replace(/[^\.\d]/g, "")
    )

    //расчётная модель
    let modelGPUArr = modelsData.find((item) => item.electricPower == nominalElectricalPowerField.value)

    //массив ТО
    let maintenanceData = [
        {
            id: "W10",
            name: "W10",
            spareParts:
                modelGPUArr.costSpareParts.w10 * exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.w10,
            years: distributionMaintenanceYear(
                maintenance.w10,
                variables.annualProductionGPU
            ),
            count: maintenance.w10.length,
        },
        {
            id: "W30",
            name: "W30",
            spareParts:
                modelGPUArr.costSpareParts.w30 * exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.w30,
            years: distributionMaintenanceYear(
                maintenance.w30,
                variables.annualProductionGPU
            ),
            count: maintenance.w30.length,
        },
        {
            id: "W40",
            name: "W40",
            spareParts:
                modelGPUArr.costSpareParts.w40 * exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.w40,
            years: distributionMaintenanceYear(
                maintenance.w40,
                variables.annualProductionGPU
            ),
            count: maintenance.w40.length,
        },
        {
            id: "W50",
            name: "W50",
            spareParts:
                modelGPUArr.costSpareParts.w50 * exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.w50,
            years: distributionMaintenanceYear(
                maintenance.w50,
                variables.annualProductionGPU
            ),
            count: maintenance.w50.length,
        },
        {
            id: "W60",
            name: "W60",
            spareParts:
                modelGPUArr.costSpareParts.w60 * exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.w60,
            years: distributionMaintenanceYear(
                maintenance.w60,
                variables.annualProductionGPU
            ),
            count: maintenance.w60.length,
        },
        {
            id: "W70",
            name: "W70",
            spareParts: variables.w70Coast
                ? modelGPUArr.costSpareParts.w70 * exchangeRatesRubCnyValue
                : "0",
            work: variables.w70Coast ? modelGPUArr.costWork.w70 : "0",
            years: distributionMaintenanceYear(
                maintenance.w70,
                variables.annualProductionGPU
            ),
            count: maintenance.w70.length,
        },
        {
            id: "turbines",
            name: "Турбины",
            spareParts:
                modelGPUArr.costSpareParts.turbineRepair *
                exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.turbineRepair,
            years: distributionMaintenanceYear(
                maintenance.turbines,
                variables.annualProductionGPU
            ),
            count: maintenance.turbines.length,
        },
        {
            id: "generator",
            name: "Генераторы",
            spareParts:
                modelGPUArr.costSpareParts.generatorRepair *
                exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.generatorRepair,
            years: distributionMaintenanceYear(
                maintenance.generator,
                variables.annualProductionGPU
            ),
            count: maintenance.generator.length,
        },
        {
            id: "oil",
            name: "Колличество замен масла на одной ГПУ",
            spareParts: "",
            work: "",
            years: getOilYears(),
            count:
                Math.floor(
                    (variables.annualProductionGPU * 8) / variables.oilResource
                ) - 1,
        },
    ]

    //тут массивы всех расчётов
    let calculatorResult =  getTepData()

    //массив себестоимости
    let costPriceData = calculatorResult.resultCostPriceArr

    //Массив итоговой сотимости и технических характеристик
    let finalCostTechChars = calculatorResult.finalCostTechCharsArr

    //Массив годовых показателей
    let finalAnnualIndicators = calculatorResult.finalAnnualIndicatorsArr

    //Данные для диаграммы Bar
    let energyProductionСostsDiagram = calculatorResult.energyProductionСostsDiagramObj

    //Данные для диаграммы затрат на энергию
    let energyСostsDiagram = calculatorResult.energyСostsDiagramObj
    
    // расчёт массивов тарифов, ТЭП, себестоимости и окупаемости
    function getTepData() {
        const capex =
            modelGPUArr.installationCost[execution] *
            exchangeRatesRubCnyValue *
            amountValue
        const thermalPowerСalories = modelGPUArr.thermalPower * 0.00086
        const resultElectricPower = modelGPUArr.electricPower * amountValue
        const maxOutputPowerGPES =
            resultElectricPower * (1 - variables.SNGPU / 100)

        // результирующий объект
        let resultObj = {
            resultInitialData: [
                {
                    id: "modelGPU",
                    name: "Модель ГПУ",
                    value: modelGPUArr.model,
                },
                {
                    id: "nominalElectricalPowerGPU",
                    name: "Номинальная электрическая мощность ГПУ",
                    value: modelGPUArr.electricPower + " кВт",
                },
                {
                    id: "numberGPUs",
                    name: "Количество ГПУ",
                    value: amountValue + " шт",
                },
                {
                    id: "nominalThermalPower",
                    name: "Номинальная тепловая мощность",
                    value: modelGPUArr.thermalPower + " кВт",
                    value2:
                        Math.round(thermalPowerСalories * 1000) / 1000 +
                        " Гкал",
                },
                {
                    id: "gasConsumption",
                    name: "Расход газа",
                    value: modelGPUArr.gasСonsumption + " нм3",
                },
                {
                    id: "SNGPU",
                    name: "СН ГПУ",
                    value: variables.SNGPU + "%",
                },
                {
                    id: "maxOutputPowerGPES",
                    name: "Макс. отпуск. мощность ГПЭС (-СН)",
                    value: maxOutputPowerGPES + " кВт",
                },
                {
                    id: "oilConsumption",
                    name: "Расход масла на угар/Объем при замене",
                    value: modelGPUArr.oilConsumptionBurning + " г/кВтч",
                    value2: modelGPUArr.oilVolumeCrankcase + " л",
                },
                {
                    id: "oilChangeIntervals",
                    name: "Переодичность замены масла",
                    value: variables.oilResource + " мч",
                },
                {
                    id: "capex",
                    name: "CAPEX",
                    value:
                        capex.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
                        " ₽",
                },
            ],
            resultTariffArr: [
                {
                    id: "gasVolume",
                    name: "1 нм3 газа",
                    price: gasPriceValue,
                    indexing: variables.indexing.gas,
                    years: calculateIndexingArr(
                        gasPriceValue,
                        parseFloat(variables.indexing.gas)
                    ),
                },
                {
                    id: "electricVolume",
                    name: "1 кВт э/э",
                    price: priceElectricityValue,
                    indexing: variables.indexing.electricPower,
                    years: calculateIndexingArr(
                        priceElectricityValue,
                        parseFloat(variables.indexing.electricPower)
                    ),
                },
                {
                    id: "thermalVolume",
                    name: "1 Гкал т/э",
                    price: priceThermalEnergyValue,
                    indexing: variables.indexing.thermalPower,
                    years: calculateIndexingArr(
                        priceThermalEnergyValue,
                        parseFloat(variables.indexing.thermalPower)
                    ),
                },
                {
                    id: "oilVolume",
                    name: "1 л масла",
                    price: variables.oilPrice,
                    indexing: variables.indexing.oil,
                    years: calculateIndexingArr(
                        parseFloat(variables.oilPrice),
                        parseFloat(variables.indexing.oil)
                    ),
                },
                {
                    id: "antifreezeVolume",
                    name: "1л антифриза",
                    price: variables.antifreezePrice,
                    indexing: variables.indexing.antifreeze,
                    years: calculateIndexingArr(
                        parseFloat(variables.antifreezePrice),
                        parseFloat(variables.indexing.antifreeze)
                    ),
                },
            ],
            finalCostTechCharsArr: [
                {
                    id: "type",
                    name: "Тип установки",
                    value: modelGPUArr.model,
                },
                {
                    id: "electricPower",
                    name: "Номинальная электрическая мощность, кВт",
                    value: modelGPUArr.electricPower,
                },
                {
                    id: "thermalPower",
                    name: "Номинальная тепловая мощность, кВт",
                    value: modelGPUArr.thermalPower,
                },
                {
                    id: "electricEfficiency",
                    name: "Электрический КПД, %",
                    value: modelGPUArr.electricEfficiency,
                },
                {
                    id: "gasConsumption",
                    name: "Потребление природного газа, Нм3/ч",
                    value: modelGPUArr.gasСonsumption,
                },
                {
                    id: "amount",
                    name: "Количество установок, шт",
                    value: amountValue,
                },
                {
                    id: "resultElectricPower",
                    name: "Суммарная электрическая мощность, кВт",
                    value: resultElectricPower,
                },
                {
                    id: "resultThermalPower",
                    name: "Суммарная тепловая мощность, Гкал/час",
                    value: modelGPUArr.thermalPower * amountValue,
                },
                {
                    id: "execution",
                    name: "Выбранное исполнение",
                    value:
                        execution === "open"
                            ? "Открытое"
                            : execution === "container"
                                ? "Контейнерное без утилизации тепла"
                                : execution === "containerHeatRecovery"
                                    ? "Контейнерное с утилизацией тепла"
                                    : "",
                },
                {
                    id: "Capex",
                    name: "Стоимость оборудования в выбранной комплектации, руб. без НДС",
                    value:
                        capex.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
                        " ₽",
                },
                {
                    id: "powerCost",
                    name: "Удельная стоимость 1 кВт установленной мощности, руб. без НДС",
                    value:
                        (
                            Math.round(
                                (capex /
                                    (modelGPUArr.electricPower * amountValue)) *
                                100
                            ) / 100
                        )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽",
                },
            ],
        }

        // массив ТЭП
        let resultTepArr = [
            {
                id: "GPUOperatingTime",
                name: "Наработка ГПУ, мч",
                years: [],
                sum: "",
            },
            {
                id: "GPUOperatingYear",
                name: "Наработка ГПУ за год, мч",
                years: [],
                sum: 0,
            },
            {
                id: "electricityGeneration",
                name: "Выработка э/э ГПЭС, кВтч",
                years: [],
                sum: 0,
            },
            {
                id: "usefulOutputElectricity",
                name: "Полезный отпуск э/э ГПЭС (- СН), кВтч",
                years: [],
                sum: 0,
            },
            {
                id: "thermalGeneration",
                name: "Выработка т/э ГПЭС, Гкал",
                years: [],
                sum: 0,
            },
            {
                id: "gasСonsumption",
                name: "Расход газа, нм3",
                years: [],
                sum: 0,
            },
            {
                id: "oilСonsumption",
                name: "Расход масла, л",
                years: [],
                sum: 0,
            },
        ]

        //итоги ТЭП
        let sumsTepArr = {
            operatingTime: "",
            operatingYear: 0,
            electricityGeneration: 0,
            usefulOutputElectricity: 0,
            thermalGeneration: 0,
            gasСonsumption: 0,
            oilСonsumption: 0,
        }

        // Массив себестоимости
        let resultCostPriceArr = [
            {
                id: "totalСosts",
                name: "Затраты на выработку э/э, в т.ч.:",
                years: [],
                sum: 0,
            },
            {
                id: "totalСostsGas",
                name: "- топливо",
                years: [],
                sum: 0,
            },
            {
                id: "totalСostsOil",
                name: "- масло",
                years: [],
                sum: 0,
            },
            {
                id: "totalСostsMaintenance",
                name: "- ТО",
                years: [],
                sum: 0,
            },
            {
                id: "costsPrice",
                name: "Себестоимость 1 кВт э/э, в т.ч.:",
                years: [],
                sum: 0,
            },
            {
                id: "costsPriceGas",
                name: "- топливо",
                years: [],
                sum: 0,
            },
            {
                id: "costsPriceOil",
                name: "- масло",
                years: [],
                sum: 0,
            },
            {
                id: "costsPriceMaintenance",
                name: "- ТО",
                years: [],
                sum: 0,
            },
        ]

        // итоги себестоимости
        let sumsCostPriceArr = {
            totalСosts: 0,
            totalСostsGas: 0,
            totalСostsOil: 0,
            totalСostsMaintenance: 0,
            costsPrice: 0,
            costsPriceGas: 0,
            costsPriceOil: 0,
            costsPriceMaintenance: 0,
        }

        // Массив окупаемости
        let resultPaybackArr = [
            {
                id: "purchaseElectricity",
                name: "Затраты на приобретение э/э",
                years: [],
                sum: 0,
            },
            {
                id: "purchaseThermalEnergy",
                name: "Затраты на приобретение т/э",
                years: [],
                sum: 0,
            },
            {
                id: "purchaseEnergyResources",
                name: "Итого на приобретение энергоносителей",
                years: [],
                sum: 0,
            },
            {
                id: "savingsElectricity",
                name: "Полученная экономия по э/э",
                years: [],
                sum: 0,
            },
            {
                id: "savingsThermalEnergy",
                name: "Полученная экономия по т/э",
                years: [],
                sum: 0,
            },
            {
                id: "resultSavings",
                name: "Экономия ИТОГО",
                years: [],
                sum: 0,
            },
            {
                id: "economicEffect",
                name: "Экономический эффект с учетом CAPEX",
                years: [],
                sum: 0,
            },
            {
                id: "resultPayback",
                name: "Окупаемость",
                years: [],
                sum: 0,
            },
        ]

        // итоги окупаемости
        let sumsPaybackArr = {
            purchaseElectricity: 0,
            purchaseThermalEnergy: 0,
            purchaseEnergyResources: 0,
            savingsElectricity: 0,
            savingsThermalEnergy: 0,
            resultSavings: 0,
            economicEffect: 0,
            resultPayback: 0,
        }

        // Объект для диаграммы затрат на энергию
        let energyСostsDiagramObj = {
            labels: [
                "установка",
                "1 год",
                "2 год",
                "3 год",
                "4 год",
                "5 год",
                "6 год",
                "7 год",
                "8 год",
            ],
            datasets: [
                {
                    label: "Затраты на покупку из сети",
                    data: [0],
                },
                {
                    label: "затраты от ГПУ",
                    data: [Math.round(capex)],
                },
            ],
        }

        // цикл по годам
        for (let i = 1; i <= 8; i++) {
            //переменные ТЭП
            let operatingTime = variables.annualProductionGPU * i
            let operatingYear = variables.annualProductionGPU
            let electricityGeneration =
                variables.annualProductionGPU * resultElectricPower
            let usefulOutputElectricity =
                maxOutputPowerGPES * variables.annualProductionGPU
            let thermalGeneration = 0
            if (execution === "containerHeatRecovery") {
                let intermediateResult = amountValue * thermalPowerСalories
                if (useThermalEnergy === "heatingSeason") {
                    if (operatingTime < variables.annualProductionGPU) {
                        if (operatingYear < 2520) {
                            thermalGeneration =
                                operatingYear * intermediateResult
                        } else if (operatingYear < 6988) {
                            thermalGeneration = 2520 * intermediateResult
                        } else {
                            thermalGeneration =
                                (operatingYear - 4368) * intermediateResult
                        }
                    } else {
                        thermalGeneration =
                            variables.hoursHeatUsage * intermediateResult
                    }
                } else {
                    thermalGeneration = operatingYear * intermediateResult
                }

                thermalGeneration = thermalGeneration
            }
            let gasСonsumption =
                operatingYear * modelGPUArr.gasСonsumption * amountValue
            let oilСonsumption =
                maintenanceData[8].years[i - 1] *
                modelGPUArr.oilVolumeCrankcase *
                amountValue +
                ((electricityGeneration * modelGPUArr.oilConsumptionBurning) /
                    1000) *
                1.11

            // Промежуточный массив ТЭП
            let yearTepArr = [
                operatingTime,
                operatingYear,
                electricityGeneration,
                usefulOutputElectricity,
                thermalGeneration,
                gasСonsumption,
                oilСonsumption,
            ]

            // помещаем результаты за год в массив ТЭП
            resultTepArr.forEach((item, index) => {
                item.years.push(yearTepArr[index])
            })

            // расчитываем суммы ТЭП
            sumsTepArr.operatingYear += operatingYear
            sumsTepArr.electricityGeneration += electricityGeneration
            sumsTepArr.usefulOutputElectricity += usefulOutputElectricity
            sumsTepArr.thermalGeneration += thermalGeneration
            sumsTepArr.gasСonsumption += gasСonsumption
            sumsTepArr.oilСonsumption += oilСonsumption

            /****************************************************** */

            // Переменные себестоимости
            let totalСostsGas =
                gasСonsumption * resultObj.resultTariffArr[0].years[i - 1]
            let totalСostsOil =
                oilСonsumption * resultObj.resultTariffArr[3].years[i - 1]

            let totalСostsMaintenanceSumm = 0
            for (let j = 0; j < 8; j++) {
                if (maintenanceData[j].years[i - 1] > 0) {
                    totalСostsMaintenanceSumm +=
                        (maintenanceData[j].spareParts +
                            maintenanceData[j].work) *
                        maintenanceData[j].years[i - 1] *
                        amountValue
                }
            }
            let totalСostsMaintenance = totalСostsMaintenanceSumm

            let totalСosts =
                totalСostsGas + totalСostsOil + totalСostsMaintenance
            let costsPrice = totalСosts / usefulOutputElectricity
            let costsPriceGas = totalСostsGas / usefulOutputElectricity
            let costsPriceOil = totalСostsOil / usefulOutputElectricity
            let costsPriceMaintenance =
                totalСostsMaintenance / usefulOutputElectricity

            // Промежуточный массив себестоимости
            let yearCostPriceArr = [
                totalСosts,
                totalСostsGas,
                totalСostsOil,
                totalСostsMaintenance,
                costsPrice,
                costsPriceGas,
                costsPriceOil,
                costsPriceMaintenance,
            ]

            // помещаем результаты за год в массив себестоимости
            resultCostPriceArr.forEach((item, index) => {
                item.years.push(yearCostPriceArr[index])
            })

            //Рассчитываем итоги себестоимости
            sumsCostPriceArr.totalСostsGas += totalСostsGas
            sumsCostPriceArr.totalСostsOil += totalСostsOil
            sumsCostPriceArr.totalСostsMaintenance += totalСostsMaintenance

            /****************************************************** */

            //переменные окупаемости
            let purchaseElectricity =
                usefulOutputElectricity *
                resultObj.resultTariffArr[1].years[i - 1]

            let purchaseThermalEnergy = 0
            if (priceThermalEnergyValue == 0) {
                purchaseThermalEnergy =
                    thermalGeneration *
                    140 *
                    resultObj.resultTariffArr[0].years[i - 1]
            } else {
                purchaseThermalEnergy =
                    thermalGeneration *
                    resultObj.resultTariffArr[2].years[i - 1]
            }

            let purchaseEnergyResources =
                purchaseElectricity + purchaseThermalEnergy
            let savingsElectricity = purchaseElectricity - totalСosts

            let savingsThermalEnergy = 0
            if (priceThermalEnergyValue == 0) {
                savingsThermalEnergy =
                    thermalGeneration *
                    125 *
                    resultObj.resultTariffArr[0].years[i - 1]
            } else {
                savingsThermalEnergy =
                    thermalGeneration *
                    resultObj.resultTariffArr[2].years[i - 1]
            }

            let resultSavings = savingsElectricity + savingsThermalEnergy

            let economicEffect = 0
            if (i > 1) {
                if (
                    resultPaybackArr[6].years[i - 2] + resultSavings <
                    resultSavings
                ) {
                    economicEffect =
                        resultPaybackArr[6].years[i - 2] + resultSavings
                } else {
                    economicEffect = resultSavings
                }
            } else {
                economicEffect = resultSavings - capex
            }

            let resultPayback = 0
            if (economicEffect / resultSavings < 0) {
                resultPayback = 1
            } else if (economicEffect / resultSavings >= 1) {
                resultPayback = 0
            } else {
                resultPayback =
                    parseInt((1 - economicEffect / resultSavings) * 100) / 100
            }

            // Промежуточный массив окупаемости
            let yearPaybackArr = [
                purchaseElectricity,
                purchaseThermalEnergy,
                purchaseEnergyResources,
                savingsElectricity,
                savingsThermalEnergy,
                resultSavings,
                economicEffect,
                resultPayback,
            ]

            // помещаем результаты за год в массив окупаемости
            resultPaybackArr.forEach((item, index) => {
                item.years.push(yearPaybackArr[index])
            })

            //Рассчитываем итоги окупаемости
            sumsPaybackArr.purchaseElectricity += purchaseElectricity
            sumsPaybackArr.purchaseThermalEnergy += purchaseThermalEnergy
            sumsPaybackArr.purchaseEnergyResources += purchaseEnergyResources
            sumsPaybackArr.savingsElectricity += savingsElectricity
            sumsPaybackArr.savingsThermalEnergy += savingsThermalEnergy
            sumsPaybackArr.resultSavings += resultSavings
            sumsPaybackArr.economicEffect +=
                economicEffect > 0 ? economicEffect : 0
            sumsPaybackArr.resultPayback += resultPayback

            // заполняем данные для диаграммы затрат на энергию
            energyСostsDiagramObj.datasets[0].data.push(
                energyСostsDiagramObj.datasets[0].data[i - 1] +
                purchaseEnergyResources
            )
            energyСostsDiagramObj.datasets[1].data.push(
                energyСostsDiagramObj.datasets[1].data[i - 1] + totalСosts
            )
        }

        //Помещаем итоги ТЭП в массив ТЭП
        resultTepArr.forEach((item, index) => {
            item.sum = sumsTepArr[Object.keys(sumsTepArr)[index]]
        })

        // добавляем массив ТЭП в результирующий объект
        resultObj.resultTepArr = resultTepArr

        //Рассчитываем итоги себестоимости
        sumsCostPriceArr.totalСosts +=
            sumsCostPriceArr.totalСostsGas +
            sumsCostPriceArr.totalСostsOil +
            sumsCostPriceArr.totalСostsMaintenance
        sumsCostPriceArr.costsPrice +=
            sumsCostPriceArr.totalСosts / sumsTepArr.usefulOutputElectricity
        sumsCostPriceArr.costsPriceGas +=
            sumsCostPriceArr.totalСostsGas / sumsTepArr.usefulOutputElectricity
        sumsCostPriceArr.costsPriceOil +=
            sumsCostPriceArr.totalСostsOil / sumsTepArr.usefulOutputElectricity
        sumsCostPriceArr.costsPriceMaintenance +=
            sumsCostPriceArr.totalСostsMaintenance /
            sumsTepArr.usefulOutputElectricity

        //Помещаем итоги себестоимости в массив себестоимости
        resultCostPriceArr.forEach((item, index) => {
            item.sum = sumsCostPriceArr[Object.keys(sumsCostPriceArr)[index]]
        })

        // добавляем массив себестоимости в результирующий объект
        resultObj.resultCostPriceArr = resultCostPriceArr

        //Помещаем итоги окупаемости в массив окупаемости
        resultPaybackArr.forEach((item, index) => {
            item.sum = sumsPaybackArr[Object.keys(sumsPaybackArr)[index]]
        })

        // добавляем массив окупаемости в результирующий объект
        resultObj.resultPaybackArr = resultPaybackArr

        // Массив годовых показателей с учётом годовой наработки
        let finalAnnualIndicatorsArr = [
            {
                id: "ElectricalEnergy",
                name: "Электрическая энергия",
                data: [
                    {
                        id: "generationElectricalEnergy",
                        name: "выработка электрической энергии генераторами, кВт*ч/год",
                        value: resultTepArr[2].years[0],
                    },
                    {
                        id: "consumptionElectricalEnergy",
                        name: "собственные нужды энергоцентра, кВт*ч/год",
                        value:
                            resultTepArr[2].years[0] - resultTepArr[3].years[0],
                    },
                    {
                        id: "releaseElectricalEnergy",
                        name: "отпуск электрической энергии в сеть предприятия, кВт*ч/год",
                        value: resultTepArr[3].years[0],
                    },
                ],
            },
            {
                id: "ThermalEnergy",
                name: "Тепловая энергия",
                data: [
                    {
                        id: "generationThermalEnergy",
                        name: "производимое количество тепловой энергии, Гкал/год",
                        value: resultTepArr[4].years[0],
                    },
                ],
            },
            {
                id: "Gas",
                name: "Природный газ",
                data: [
                    {
                        id: "consumptionGas",
                        name: "годовое потребление газа Энергоцентра, Нм3/год",
                        value: resultTepArr[5].years[0],
                    },
                ],
            },
            {
                id: "Payback",
                name: "Окупаемость",
                data: [
                    {
                        id: "paybackHeader",
                        name: "",
                        value1: "При производстве собственной энергии",
                        value2: "Приобретение эквивалентного количества энергоресурсов от сетей",
                    },
                    {
                        id: "averageElectricalEnergyСosts",
                        name: "Средние затраты на ЭЭ в год, руб. без НДС",
                        value1:
                            Math.round(
                                resultCostPriceArr[0].sum /
                                resultPaybackArr[0].years.length
                            ) + " ₽",
                        value2:
                            Math.round(
                                resultPaybackArr[0].sum /
                                resultPaybackArr[0].years.length
                            ) + " ₽",
                    },
                    {
                        id: "averageThermalEnergyСosts",
                        name: "Средние затраты на приобретение тепловой энергии в год, руб. без НДС",
                        value1: "",
                        value2:
                            Math.round(
                                resultPaybackArr[1].sum /
                                resultPaybackArr[1].years.length
                            ) + " ₽",
                    },
                    {
                        id: "averageEnergyProductionCosts",
                        name: "Итого затраты на электро- и тепло- энергию, руб. без НДС",
                        value1:
                            Math.round(
                                resultCostPriceArr[0].sum /
                                resultPaybackArr[0].years.length
                            ) + " ₽",
                        value2:
                            Math.round(
                                resultPaybackArr[0].sum /
                                resultPaybackArr[0].years.length +
                                resultPaybackArr[1].sum /
                                resultPaybackArr[1].years.length
                            ) + " ₽",
                    },
                    {
                        id: "averageSavings",
                        name: "Экономия за год, руб. без НДС",
                        value1:
                            Math.round(
                                resultPaybackArr[5].sum /
                                resultPaybackArr[5].years.length
                            ) + " ₽",
                        value2: "",
                    },
                    {
                        id: "paybackPeriod",
                        name: "Срок окупаемости, лет",
                        value1: floatToYearsMonths(resultPaybackArr[7].sum),
                        value2: "",
                    },
                ],
            },
        ]

        // добавляем массив годовых показателей в результирующий объект
        resultObj.finalAnnualIndicatorsArr = finalAnnualIndicatorsArr

        // Объект для диаграммы затрат на выработку электоэнергии
        let energyProductionСostsDiagramObj = {
            labels: resultCostPriceArr[0].years.map(
                (_, index) => index + 1 + " год"
            ),
            datasets: [
                {
                    label: "Газ",
                    data: resultCostPriceArr[1].years.map((item) =>
                        Math.round(item)
                    ),
                },
                {
                    label: "Масло",
                    data: resultCostPriceArr[2].years.map((item) =>
                        Math.round(item)
                    ),
                },
                {
                    label: "ЗИП, работы",
                    data: resultCostPriceArr[3].years.map((item) =>
                        Math.round(item)
                    ),
                },
            ],
        }

        // добавляем объект для диаграммы затрат в результирующий объект
        resultObj.energyProductionСostsDiagramObj =
            energyProductionСostsDiagramObj

        // округляем данные для диаграммы затрат на энергию
        energyСostsDiagramObj.datasets[0].data =
            energyСostsDiagramObj.datasets[0].data.map((item) =>
                Math.round(item)
            )
        energyСostsDiagramObj.datasets[1].data =
            energyСostsDiagramObj.datasets[1].data.map((item) =>
                Math.round(item)
            )

        // добавляем объект для диаграммы затрат на энергию в результирующий объект
        resultObj.energyСostsDiagramObj = energyСostsDiagramObj

        return resultObj
    }

    /* Валидация формы */
    if(calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault()

            fieldValidate(userNameField, 'name')
            fieldValidate(companyNameField, 'name')
            fieldValidate(userPhoneField, 'phone')
            fieldValidate(userEmailField, 'email')
            privacyCheckboxValidate()

            if (
                exchangeRatesRubCnyField.classList.contains('error') ||
                nominalElectricalPowerField.classList.contains('error') ||
                amountField.classList.contains('error') ||
                gasPriceField.classList.contains('error') ||
                priceElectricityField.classList.contains('error') ||
                priceThermalEnergyField.classList.contains('error') ||
                userNameField.classList.contains('error') ||
                companyNameField.classList.contains('error') ||
                userPhoneField.classList.contains('error') ||
                userPhoneField.classList.contains('error') ||
                !privacyCheckboxValidate()
            ) {
                console.log("ошибка в данных формы")
            } else {
                calculate()
            }
        })
    }

    // пересчёт и отправка
    function calculate() {
        if(calculatorForm) {
            calculatorForm.classList.add('hiddenBlock')
        }
        if(finalContainer) {
            finalContainer.classList.remove('hiddenBlock')
        }
        window.scrollTo(0, 0)

        exchangeRatesRubCnyValue = parseFloat(exchangeRatesRubCnyField.value.toString().replace(/[^\.\d]/g, ""))
        amountValue = parseFloat(amountField.value.toString().replace(/\D/g, ""))
        gasPriceValue = parseFloat(gasPriceField.value.toString().replace(/[^\.\d]/g, ""))
        priceElectricityValue = parseFloat(priceElectricityField.value.toString().replace(/[^\.\d]/g, ""))
        priceThermalEnergyValue = parseFloat(priceThermalEnergyField.value.toString().replace(/[^\.\d]/g, ""))
        modelGPUArr = modelsData.find((item) => item.electricPower == nominalElectricalPowerField.value)
        maintenanceData = [
            {
                id: "W10",
                name: "W10",
                spareParts:
                    modelGPUArr.costSpareParts.w10 * exchangeRatesRubCnyValue,
                work: modelGPUArr.costWork.w10,
                years: distributionMaintenanceYear(
                    maintenance.w10,
                    variables.annualProductionGPU
                ),
                count: maintenance.w10.length,
            },
            {
                id: "W30",
                name: "W30",
                spareParts:
                    modelGPUArr.costSpareParts.w30 * exchangeRatesRubCnyValue,
                work: modelGPUArr.costWork.w30,
                years: distributionMaintenanceYear(
                    maintenance.w30,
                    variables.annualProductionGPU
                ),
                count: maintenance.w30.length,
            },
            {
                id: "W40",
                name: "W40",
                spareParts:
                    modelGPUArr.costSpareParts.w40 * exchangeRatesRubCnyValue,
                work: modelGPUArr.costWork.w40,
                years: distributionMaintenanceYear(
                    maintenance.w40,
                    variables.annualProductionGPU
                ),
                count: maintenance.w40.length,
            },
            {
                id: "W50",
                name: "W50",
                spareParts:
                    modelGPUArr.costSpareParts.w50 * exchangeRatesRubCnyValue,
                work: modelGPUArr.costWork.w50,
                years: distributionMaintenanceYear(
                    maintenance.w50,
                    variables.annualProductionGPU
                ),
                count: maintenance.w50.length,
            },
            {
                id: "W60",
                name: "W60",
                spareParts:
                    modelGPUArr.costSpareParts.w60 * exchangeRatesRubCnyValue,
                work: modelGPUArr.costWork.w60,
                years: distributionMaintenanceYear(
                    maintenance.w60,
                    variables.annualProductionGPU
                ),
                count: maintenance.w60.length,
            },
            {
                id: "W70",
                name: "W70",
                spareParts: variables.w70Coast
                    ? modelGPUArr.costSpareParts.w70 * exchangeRatesRubCnyValue
                    : "0",
                work: variables.w70Coast ? modelGPUArr.costWork.w70 : "0",
                years: distributionMaintenanceYear(
                    maintenance.w70,
                    variables.annualProductionGPU
                ),
                count: maintenance.w70.length,
            },
            {
                id: "turbines",
                name: "Турбины",
                spareParts:
                    modelGPUArr.costSpareParts.turbineRepair *
                    exchangeRatesRubCnyValue,
                work: modelGPUArr.costWork.turbineRepair,
                years: distributionMaintenanceYear(
                    maintenance.turbines,
                    variables.annualProductionGPU
                ),
                count: maintenance.turbines.length,
            },
            {
                id: "generator",
                name: "Генераторы",
                spareParts:
                    modelGPUArr.costSpareParts.generatorRepair *
                    exchangeRatesRubCnyValue,
                work: modelGPUArr.costWork.generatorRepair,
                years: distributionMaintenanceYear(
                    maintenance.generator,
                    variables.annualProductionGPU
                ),
                count: maintenance.generator.length,
            },
            {
                id: "oil",
                name: "Колличество замен масла на одной ГПУ",
                spareParts: "",
                work: "",
                years: getOilYears(),
                count:
                    Math.floor(
                        (variables.annualProductionGPU * 8) / variables.oilResource
                    ) - 1,
            },
        ]

        calculatorResult = getTepData()
        costPriceData = calculatorResult.resultCostPriceArr
        finalCostTechChars = calculatorResult.finalCostTechCharsArr
        finalAnnualIndicators = calculatorResult.finalAnnualIndicatorsArr
        energyProductionСostsDiagram = calculatorResult.energyProductionСostsDiagramObj
        energyСostsDiagram = calculatorResult.energyСostsDiagramObj

        if(finalContainer) {
            finalContainer.innerHTML = finalData(finalCostTechChars, finalAnnualIndicators, costPriceData)

            const lineDiagramCTX = finalContainer.querySelector('[data-js="diagramLine"]')

            if(lineDiagramCTX) {
                new Chart(lineDiagramCTX, {
                    type: 'line',
                    data: energyСostsDiagram,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                font: {
                                    size: 20,
                                },
                                text: "Затраты на электроэнергию",
                            },
                        },
                    }
                })
            }

            const barDiagramCTX = finalContainer.querySelector('[data-js="diagramBar"]')

            if(barDiagramCTX) {
                new Chart(barDiagramCTX, {
                    type: 'bar',
                    data: energyProductionСostsDiagram,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                font: {
                                    size: 20,
                                },
                                text: "Операционные расходы",
                            },
                        },
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true,
                            },
                        },
                    }
                })
            }

        }
    }
}

/* Обработка числовых полей */
function inputControlHandler(dir, type, e, targetEl) {
    e.preventDefault()
    e.stopPropagation()

    let targetState = targetEl.closest('.formField').querySelector('input')
    let startValue = isNaN(parseFloat(targetState.value)) ? 0 : parseFloat(targetState.value)
    let step = 1

    switch (type) {
        case "fraction":
            step = 0.01
            if (dir == "up") {
                targetState.value = Math.round((startValue + step) * 100) / 100
                
            } else if (dir == "down") {
                targetState.value = startValue - step > 0 ? Math.round((startValue - step) * 100) / 100 : 0.01 
            }

            break
        case "number":
            if (dir == "up") {
                targetState.value = startValue + step
            } else if (dir == "down") {
                targetState.value = startValue - step > 0 ? startValue - step : 1
            }
            break
        default:
            return
    }

    targetState.classList.remove('error')
}

/* Обработка фокуса поля */
function inputFocusHandler(type = "", event) {
    let el = event.target
    if (type === "phone") {
        let currentValue = el.value.replace(/\D/g, "")

        if (currentValue.length < 3) {
            el.value = "+7"
        }
    }

    el.style.borderColor = "#005CA9"
}

/* Обработка изменения поля */
function inputChangeHandler(type = "", event) {
    let el = event.target

    if (type === "float") {
        let currentValue = el.value.replace(/[^\.\d]/g, "")

        el.value = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

        if (currentValue.length < 1) {
            el.classList.add('error')
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#005CA9"
        }
    } else if (type === "int") {
        let currentValue = el.value.replace(/\D/g, "")

        el.value = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

        if (currentValue.length < 1) {
            el.classList.add('error')
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#005CA9"
        }
    } else if (type === "name") {
        let currentValue = el.value.replace(
            /[^а-яА-Яa-zA-Z\s]/g,
            ""
        )
        el.value = currentValue

        if (currentValue.length < 2) {
            el.classList.add('error')
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#005CA9"
        }
    } else if (type === "phone") {
        let matrix = "+7 (___) ___-__-__"
        let i = 0
        let def = matrix.replace(/\D/g, "")
        let currentValue = el.value.replace(/\D/g, "")

        if (def.length >= currentValue.length) {
            currentValue = def
        }

        let newValue = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < currentValue.length
                ? currentValue.charAt(i++)
                : i >= currentValue.length
                    ? ""
                    : a
        })

        el.value = newValue

        if (newValue.length !== 18) {
            el.classList.add('error')
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#005CA9"
        }
    } else if (type === "email") {
        let currentValue = el.value.replace(/[а-яА-Я]/g, "")
        el.value = currentValue

        const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!res.test(String(currentValue).toLowerCase())) {
            el.classList.add('error')
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#005CA9"
        }
    } else {
        el.style.borderColor = "#005CA9"
    }
}

/* Обработка снятия фокуса с поля */
function inputBlurHandler(type = "", event) {
    let el = event.target

    if (type === "name") {
        let currentValue = el.value

        if (currentValue.length < 2) {
            el.classList.add('error')
            el.style.borderColor = "#F01471"
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#000"
        }
    } else if (type === "phone") {
        let currentValue = el.value

        if (currentValue.length !== 18) {
            el.classList.add('error')
            el.style.borderColor = "#F01471"
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#000"
        }

        if (currentValue.length == 2) {
            el.value = ""
        }
    } else if (type === "email") {
        let currentValue = el.value

        const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!res.test(String(currentValue).toLowerCase())) {
            el.classList.add('error')
            el.style.borderColor = "#F01471"
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#000"
        }
    } else {
        let currentValue = el.value

        if (currentValue.length < 1) {
            el.classList.add('error')
            el.style.borderColor = "#F01471"
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#000"
        }
    }
    
}

/* Валидация поля */
function fieldValidate(el, type) {
    if (type === "name") {
        let currentValue = el.value

        if (currentValue.length < 2) {
            el.classList.add('error')
            el.style.borderColor = "#F01471"
            return true
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#000"
            return false
        }
    } else if (type === "phone") {
        let currentValue = el.value

        if (currentValue.length !== 18) {
            el.classList.add('error')
            el.style.borderColor = "#F01471"
            return true
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#000"
            return false
        }
    } else if (type === "email") {
        let currentValue = el.value

        const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!res.test(String(currentValue).toLowerCase())) {
            el.classList.add('error')
            el.style.borderColor = "#F01471"
            return true
        } else {
            el.classList.remove('error')
            el.style.borderColor = "#000"
            return false
        }
    } else {
        return false
    }
}

function finalData(costTechChars, annualIndicators, costPriceData) {
    return `<div class='finalTitle'>
                Стоимость и основные технические характеристики
            </div>

            <table style="${getStyle('finalTable')}">
                ${costTechChars.map((item, index) => {
                    return `
                        <tr style="${getStyle('finalTableRow')}">
                            <td style="${getStyle('finalTableCol1')}">
                                ${item.name}
                            </td>
                            <td style="${getStyle('finalTableCol2')}">
                                <span>
                                    ${index !== 0
                                        ? item.value
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                " "
                                            )
                                        : item.value}
                                </span>
                            </td>
                        </tr>`
                }).join('')}
            </table>
            <table style="${getStyle('finalTable2')}">
                <tr style='${getStyle("finalTableHeaderRow")}'>
                    <td style='${getStyle("finalTableFirstCol")}'>Операционные затраты (год)</td>
                    <td style='${getStyle("finalTableSecondCol")}'>1 год</td>
                    <td style='${getStyle("finalTableSecondCol")}'>2 год</td>
                    <td style='${getStyle("finalTableSecondCol")}'>3 год</td>
                    <td style='${getStyle("finalTableSecondCol")}'>4 год</td>
                    <td style='${getStyle("finalTableSecondCol")}'>5 год</td>
                    <td style='${getStyle("finalTableSecondCol")}'>6 год</td>
                    <td style='${getStyle("finalTableSecondCol")}'>7 год</td>
                    <td style='${getStyle("finalTableSecondCol")}'>8 год</td>
                    <td style='${getStyle("finalTableSecondCol")}'>ИТОГО</td>
                </tr>
                ${costPriceData.map((item, index) => {
                    return `
                        <tr
                            style="${
                                index == costPriceData.length - 1
                                    ? getStyle('finalTableRow')
                                    : getStyle('finalTable2Row')
                            }">

                            ${index == 4 ? `
                                <td style='${getStyle("finalTableFirstNameDivCol")}'>
                                    <span style='${getStyle("finalTableFirstNameLeft")}'>${item.name}</span>
                                    <span style='${getStyle("finalTableFirstNameRight")}'>
                                        ${(Math.round(item.sum * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g," ") + " "}
                                    </span>
                                </td>
                            ` : `
                                <td style='${getStyle('finalTableFirstNameCol')}'>${item.name}</td>
                            `}

                            ${item.years.map((innerItem) => {
                                return index < 4 ? `
                                    <td style="${getStyle('finalTableSecondCol')}">
                                        ${Math.round(innerItem)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                " "
                                            ) + " "}
                                    </td>
                                ` : `
                                    <td style="${getStyle('finalTableSecondCol')}">
                                        ${(Math.round(innerItem * 100) / 100)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                " "
                                            ) + " "}
                                    </td>
                                `
                            }).join('')}

                            ${index < 4 ? `
                                <td style="${getStyle('finalTableSecondCol')}">
                                    ${Math.round(item.sum)
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            " "
                                        ) + " "}
                                </td>
                            ` : `
                                <td style="${getStyle('finalTableSecondCol')}">
                                    ${(Math.round(item.sum * 100) / 100)
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            " "
                                        ) + " "}
                                </td>
                            `}
                        </tr>
                    `
                }).join('')}
            </table>

            <div class='diagramWrap'>
                <canvas class="diagramCanvas" data-js="diagramBar"></canvas>
            </div>

            <div class='finalTitle'>Расчетные годовые показатели при годовой наработке 8000 рабочих часов</div>

            <table style="${getStyle('finalTable')}">
                ${annualIndicators.map((item) => {
                    if (item.id !== "Payback") {
                        return `
                            <tbody style="${getStyle('finalTableBlock')}">
                                <tr style="${getStyle('finalTableRow')}">
                                    <td style="${getStyle('finalTableTitleCol')}">
                                        ${item.name}
                                    </td>
                                </tr>
                                ${item.data.map((dataItem) => {
                                    return `
                                        <tr style="${getStyle('finalTableRow')}">
                                            <td style="${getStyle('finalTableLastCol1')}">
                                                ${dataItem.name}
                                            </td>
                                            <td style="${getStyle('finalTableLastCol2')}">
                                                <span>
                                                    ${dataItem.value !== 0
                                                        ? Math.round(
                                                            dataItem.value
                                                        )
                                                            .toString()
                                                            .replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                " "
                                                            )
                                                        : "-"}
                                                </span>
                                            </td>
                                        </tr>`
                                }).join('')}
                            </tbody>
                        `
                    } else {
                        return `
                            <tbody style="${getStyle('finalTableBlock')}">
                                <tr style="${getStyle('finalTableRow')}">
                                    <td style="${getStyle('finalTableTitleCol')}">
                                        ${item.name}
                                    </td>
                                </tr>
                                ${item.data.map((dataItem, dataIndex) => {
                                    return `
                                        <tr style="${getStyle('finalTableRow')}">
                                            <td style="${getStyle('finalTableLastCol1')}">
                                                ${dataItem.name}
                                            </td>
                                            <td style="${getStyle('finalTablePaybackCol2')}">
                                                <span
                                                    style="${
                                                        dataIndex == 0
                                                            ? getStyle('finalTablePaybackSubtitle')
                                                            : getStyle('finalTablePaybackValue')
                                                    }"
                                                >
                                                    ${dataItem.value1
                                                        .toString()
                                                        .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            " "
                                                        )}
                                                </span>

                                                <span
                                                    style="${
                                                        dataIndex == 0
                                                            ? getStyle('finalTablePaybackSubtitle')
                                                            : getStyle('finalTablePaybackValue')
                                                    }"
                                                >
                                                    ${dataItem.value2
                                                        .toString()
                                                        .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            " "
                                                        )}
                                                </span>
                                            </td>
                                        </tr>
                                    `
                                }).join('')}
                            </tbody>
                        `
                    }
                }).join('')}
            </table>
            <div class='diagramWrap'>
                <canvas class="diagramCanvas" data-js="diagramLine"></canvas>
            </div>

            <button
                type="button"
                class='calcBtn'
                onclick='printResult()'
            >
                Распечатать рассчёт
            </button>`
}

/**********Статичные данные ******************/

// Модели
const modelsData = [
    {
        model: "LY1200GH-T",
        electricPower: 1100,
        thermalPower: 1200,
        electricEfficiency: 41.0,
        thermalEfficiency: 44.7,
        gasСonsumption: 288,
        oilConsumptionBurning: 0.2,
        oilVolumeCrankcase: 180,
        antifreezeVolume: 150,
        installationCost: {
            open: 2733800,
            container: 3544800,
            containerHeatRecovery: 3817200,
        },
        costSpareParts: {
            w10: 2725.38,
            w30: 3774.12,
            w40: 45950.52,
            w50: 233600.36,
            w60: 388411.576,
            w70: 773277.68,
            turbineRepair: 48440,
            generatorRepair: 84000,
        },
        costWork: {
            w10: 28000,
            w30: 56000,
            w40: 56000,
            w50: 360000,
            w60: 450000,
            w70: 900000,
            turbineRepair: 151463,
            generatorRepair: 400000,
        },
    },
    {
        model: "LY1600GH-T",
        electricPower: 1500,
        thermalPower: 1670,
        electricEfficiency: 41.3,
        thermalEfficiency: 46.0,
        gasСonsumption: 391,
        oilConsumptionBurning: 0.2,
        oilVolumeCrankcase: 240,
        antifreezeVolume: 180,
        installationCost: {
            open: 3401120,
            container: 4268640,
            containerHeatRecovery: 4614240,
        },
        costSpareParts: {
            w10: 2448.6,
            w30: 4215.96,
            w40: 54204.36,
            w50: 302115.03,
            w60: 502049.338,
            w70: 1005137.686,
            turbineRepair: 48440,
            generatorRepair: 84000,
        },
        costWork: {
            w10: 28000,
            w30: 56000,
            w40: 56000,
            w50: 450000,
            w60: 540000,
            w70: 1200000,
            turbineRepair: 151463,
            generatorRepair: 400000,
        },
    },
    {
        model: "LY2000GH-T",
        electricPower: 2000,
        thermalPower: 2200,
        electricEfficiency: 41.6,
        thermalEfficiency: 45.8,
        gasСonsumption: 517,
        oilConsumptionBurning: 0.2,
        oilVolumeCrankcase: 300,
        antifreezeVolume: 250,
        installationCost: {
            open: 3981440,
            container: 5000000,
            containerHeatRecovery: 5430800,
        },
        costSpareParts: {
            w10: 2396.24,
            w30: 3872.4,
            w40: 63747.6,
            w50: 441480.592,
            w60: 701865.752,
            w70: 1270660.132,
            turbineRepair: 96880,
            generatorRepair: 84000,
        },
        costWork: {
            w10: 28000,
            w30: 56000,
            w40: 56000,
            w50: 540000,
            w60: 630000,
            w70: 1400000,
            turbineRepair: 302926,
            generatorRepair: 400000,
        },
    },
]

// Общие переменные
const variables = {
    SNGPU: 3,
    annualProductionGPU: 8000,
    hoursHeatUsage: 4392,
    w70Coast: false,
    oilPrice: 450,
    antifreezePrice: 300,
    oilResource: 3000,
    indexing: {
        gas: 2,
        electricPower: 3,
        thermalPower: 2,
        oil: 4,
        antifreeze: 4,
    },
}

// Техническое обслуживание
const maintenance = {
    w10: [50, 16050, 32050, 48050],
    w30: [
        2000, 6000, 10000, 14000, 18000, 22000, 26000, 30000, 34000, 38000,
        42000, 46000, 50000, 54000, 58000, 62000,
    ],
    w40: [
        4000, 8000, 12000, 20000, 24000, 28000, 36000, 40000, 44000, 52000,
        56000, 60000,
    ],
    w50: [16000, 48000],
    w60: [32000],
    w70: [64000],
    turbines: [12000, 24000, 36000, 48000, 60000],
    generator: [20000, 40000, 60000],
}

// Стили таблиц
const styles = {
        finalTable: `
            display: flex;
            flex-direction: column;
            font-size: 16px;
            line-height: 1.1em;
            font-weight: 500;
            background-color: #F6F6F6;
            flex: 0 0 auto;
            max-width: 100%;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #000;
            border-right-width: 0;
            border-bottom-width: 0;`,

        finalTable2:`
            display: flex;
            flex-direction: column;
            font-size: 12px;
            line-height: 1.1em;
            font-weight: 500;
            background-color: #F6F6F6;
            flex: 0 0 auto;
            max-width: 100%;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #000;
            border-right-width: 0;
            border-bottom-width: 0;`,

        finalTableRow:`
            display: flex;
            align-items: stretch;
            box-sizing: border-box;
            border-bottom: 1px solid #000;`,


        finalTable2Row:`
            display: flex;
            align-items: stretch;
            box-sizing: border-box;
            border-bottom: 1px solid #000;`,

        finalTableHeaderRow:`
            display: flex;
            align-items: stretch;
            box-sizing: border-box;
            font-weight: 700;
            border-bottom: 1px solid #000;
            text-align: center;`,

        finalTableCol1:`
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex: 0 0 70%;
            box-sizing: border-box;
            min-height: 18px;
            border-right: 1px solid #000;
            padding: 8px 0 8px 8px;`,

        finalTableCol2:`
        display: flex;
            align-items: center;
            justify-content: flex-end;
            flex: 1 0 30%;
            box-sizing: border-box;
            min-height: 18px;
            text-align: end;
            border-right: 1px solid #000;
            padding: 8px 8px 8px 0;`,

        finalTableLastCol1:`
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex: 0 0 50%;
            box-sizing: border-box;
            min-height: 18px;
            border-right: 1px solid #000;
            padding: 8px 0 8px 8px;`,

        finalTableLastCol2:`
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex: 1 0 50%;
            box-sizing: border-box;
            min-height: 18px;
            text-align: end;
            border-right: 1px solid #000;
            padding: 8px 8px 8px 0;`,

        finalTablePaybackCol2:`
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex: 1 0 50%;
            box-sizing: border-box;
            min-height: 18px;
            text-align: end;`,

        finalTablePaybackSubtitle:`
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 1 50%;
            box-sizing: border-box;
            text-align: center;
            min-height: 18px;
            border-right: 1px solid #000;
            padding: 8px;
            font-weight: 700;
            font-size: 14px;
            height: 100%;`,

        finalTablePaybackValue:`
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 1 50%;
            box-sizing: border-box;
            min-height: 18px;
            text-align: end;
            border-right: 1px solid #000;
            padding: 8px;
            height: 100%;`,

        finalTableFirstCol:`
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 20%;
            box-sizing: border-box;
            min-height: 18px;
            border-right: 1px solid #000;
            padding: 8px 0;`,


        finalTableFirstNameCol:`
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex: 0 0 20%;
            box-sizing: border-box;
            min-height: 18px;
            border-right: 1px solid #000;
            padding: 8px;`,


        finalTableFirstNameDivCol:`
            display: flex;
            align-items: stretch;
            justify-content: flex-start;
            flex: 0 0 20%;
            box-sizing: border-box;
            min-height: 18px;
            border-right: 1px solid #000;`,

        finalTableFirstNameLeft:`
            flex: 0 1 60%;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-right: 1px solid #000;`,

        finalTableFirstNameRight:`
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex: 0 1 40%;
            padding: 8px;`,

        finalTableSecondCol:`
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            flex-shrink: 1;
            flex-grow: 1;
            flex-basis: calc(80% / 9);
            box-sizing: border-box;
            min-height: 18px;
            border-right: 1px solid #000;
            padding: 8px 0;`,

        finalTableBlock:`
            display: flex;
            flex-direction: column;
            max-width: 100%;
            width: 100%;
            box-sizing: border-box;`,

        finalTableTitleCol: `
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 100%;
            box-sizing: border-box;
            font-weight: 700;
            padding: 8px 0;
            border-right: 1px solid #000;`,
    }

// Адаптив таблиц
const mobStyles = {
        finalTable:`
            font-size: 10px;`,

        finalTable2:`
            font-size: 6px;`,

        finalTableRow:`
            border-bottom: 0.5px solid #000;`,

        finalTable2Row:`
            border-bottom: 0.5px solid #000;`,

        finalTableHeaderRow:`
            border-bottom: 0.5px solid #000;`,

        finalTableCol1:`
            border-right: 0.5px solid #000;
            padding: 2px 0 2px 2px;`,

        finalTableCol2:`
            border-right: 0.5px solid #000;
            padding: 2px 2px 2px 0;`,

        finalTableLastCol1:`
            flex: 0 0 35%;
            border-right: 0.5px solid #000;
            padding: 2px 0 2px 2px;`,

        finalTableLastCol2:`
            flex: 1 0 65%;
            border-right: 0.5px solid #000;
            padding: 2px 2px 2px 0;`,

        finalTablePaybackSubtitle:`
            border-right: 0.5px solid #000;
            padding: 2px;
            font-size: 10px;`,

        finalTablePaybackValue:`
            border-right: 0.5px solid #000;
            padding: 2px;`,

        finalTableFirstCol:`
            flex: 0 0 17%;
            border-right: 0.5px solid #000;
            padding: 2px 0;`,

        finalTableFirstNameCol:`
            flex: 0 0 17%;
            border-right: 0.5px solid #000;
            padding: 2px;`,

        finalTableFirstNameDivCol:`
            flex-direction: column;
            flex: 0 0 17%;
            border-right: 0.5px solid #000;`,


        finalTableFirstNameLeft:`
            flex: 0 1 auto;
            padding: 2px;
            text-align: left;
            border-right: 0 solid #000;
            border-bottom: 0.5px solid #000;`,

        finalTableFirstNameRight:`
            padding: 2px;`,

        finalTableSecondCol:`
            flex-basis: calc(83% / 9);
            border-right: 0.5px solid #000;
            padding: 2px;`,

        finalTableTitleCol:`
            padding: 2px 0;
            border-right: 0.5px solid #000;`,
}

/**********Вспомогательные функции ****/

// получение стилей для элемента
function getStyle(elName) {
    let ww = window.innerWidth
    let bp = 768
    
    if(ww < bp && mobStyles[elName]) {
        return styles[elName].concat(mobStyles[elName]);
    } else {
        return styles[elName];
    }   
}

//печать страницы
function printResult() {
    window.print()
}

//расчёт индексации тарифов
function calculateIndexingArr(startPrice, indexing) {
    indexing = indexing / 100
    let acc = startPrice * indexing + startPrice
    let i
    let resultArr = []
    for (i = 1; i <= 8; i++) {
        resultArr.push(acc)
        acc = acc * indexing + acc
    }

    return resultArr
}

// распределение количества ТО по годам
function distributionMaintenanceYear(maintenanceArr, annualOperatingTime) {
    let resultArr = []

    for (let i = 1; i <= 8; i++) {
        let filteredArr = maintenanceArr.filter(
            (item) =>
                item > annualOperatingTime * i - annualOperatingTime &&
                item <= annualOperatingTime * i
        )
        resultArr.push(filteredArr.length)
    }

    return resultArr
}

//расчёт количества замен масла по годам
function getOilYears() {
    let resultArr = []
    let annualProductionGPU = variables.annualProductionGPU
    let oilResource = variables.oilResource

    for (let i = 0; i < 8; i++) {
        if (i === 0) {
            resultArr.push(Math.floor(annualProductionGPU / oilResource))
        } else if (i === 7) {
            resultArr.push(
                Math.floor(
                    (annualProductionGPU * (i + 1) -
                        Math.floor((annualProductionGPU * i) / oilResource) *
                            oilResource) /
                        oilResource
                ) - 1
            )
        } else {
            resultArr.push(
                Math.floor(
                    (annualProductionGPU * (i + 1) -
                        Math.floor((annualProductionGPU * i) / oilResource) *
                            oilResource) /
                        oilResource
                )
            )
        }
    }

    return resultArr
}

//преобразование десятичных дробей чисел в годы и месяцы
function floatToYearsMonths(value) {
    var totalDays = value * 365
    var years = Math.floor(totalDays / 365)
    var months = Math.floor((totalDays - years * 365) / 30)
    var yearsText = numWord(years, ["год", "года", "лет"])
    var monthsText = numWord(months, ["месяц", "месяца", "месяцев"])

    var result =
        years === 0 && months === 0
            ? years + " " + yearsText
            : (years > 0 ? years + " " + yearsText + " " : "") +
              (months > 0 ? months + " " + monthsText : "")

    return result
}

//склонение числительных
function numWord(value, words) {
    value = Math.abs(value) % 100
    var num = value % 10
    if (value > 10 && value < 20) return words[2]
    if (num > 1 && num < 5) return words[1]
    if (num == 1) return words[0]
    return words[2]
}