import { useState, useMemo, useRef } from "react"

import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Line } from "react-chartjs-2"

ChartJS.register()

// Хук для двусторонней связи полей ввода





//заполнение и отправка формы
function submitForm(userData, data1, data2) {
    const resultForm = document.querySelector("[data-js='resultForm']")

    if (!resultForm) return

    const inputs = resultForm.querySelectorAll("input")
    const ex = data1[8].value

    let inputCount = 0

    userData.forEach((item) => {
        inputs[inputCount].value = item

        inputCount += 1
    })

    data1.forEach((item) => {
        inputs[inputCount].value = item.value

        inputCount += 1
    })

    data2[0].data.forEach((item) => {
        inputs[inputCount].value =
            item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
            " кВт*ч/год"

        inputCount += 1
    })

    data2[1].data.forEach((item) => {
        inputs[inputCount].value =
            item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
            " Гкал/год"

        inputCount += 1
    })

    data2[2].data.forEach((item) => {
        inputs[inputCount].value =
            item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
            " Нм3/год"

        inputCount += 1
    })

    data2[3].data.forEach((item, index) => {
        if (index == 1 || index == 2) {
            if (ex == "Контейнерное с утилизацией тепла") {
                inputs[inputCount].value =
                    item.value1.length > 0
                        ? item.value1
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        : "-"
            } else {
                inputs[inputCount].value =
                    item.value1.length > 0
                        ? item.value2
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        : "-"
            }

            inputCount += 1
        }

        if (index == 3) {
            inputs[inputCount].value =
                item.value1.length > 0
                    ? item.value1
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    : "-"

            inputCount += 1

            inputs[inputCount].value =
                item.value2.length > 0
                    ? item.value2
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    : "-"

            inputCount += 1
        }

        if (index == 4 || index == 5) {
            inputs[inputCount].value =
                item.value1.length > 0
                    ? item.value1
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    : "0"

            inputCount += 1
        }
    })

    const checkbox = resultForm.querySelector(
        '[name="согласие_на_обработку_персональных_данных"]'
    )
    checkbox.checked = true

    const submitBtn = resultForm.querySelector('[type="submit"]')
    submitBtn.click()
}

import type { ComponentType } from "react"

export function withFormAttr(Component): ComponentType {
    return (props) => {
        return (
            <Component
                {...props}
                data-js="resultForm"
                id="bf360_successful_submit_calculator"
            />
        )
    }
}

export function withSubmiitBtnAttr(Component): ComponentType {
    return (props) => {
        return <Component {...props} data-js="submitBtn" onClick="" />
    }
}

export function withPrivacyCheckboxAttr(Component): ComponentType {
    return (props) => {
        return <Component {...props} data-js="privacyCheckbox" />
    }
}
