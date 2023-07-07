import React from "react";

import { useState } from "react";


import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useBreakpointValue
  } from '@chakra-ui/react'

  // default values for breakpoints chakra ui
  // const breakpoints = {
  //   sm: '30em', // 480px
  //   md: '48em', // 768px
  //   lg: '62em', // 992px
  //   xl: '80em', // 1280px
  //   '2xl': '96em', // 1536px
  // }


export default function MainTable (props) {

    const [selectedRow, setSelectedRow] = useState(null)

    const isSmallerScreenForEmail = useBreakpointValue({base: true, sm: true, md: true, lg: false, xl: false})

    const isSmallerScreenForGender = useBreakpointValue({base: true, sm: true, md: false, lg: false, xl: false})

    const isSmallerScreenForCell = useBreakpointValue({base: true, sm: false, md: false, lg: false, xl: false})
 
    function MakeTableData (props) {
        
        const selectPerson = (obj, number) => {
          return (
            obj[number]
          )
        }

        // в данному компонеті використовується функція onClick (функція використовує hook useState - при натисканні по довільній стрічці цьому стейту присвоюється key поточної стрічки), яка при натисканні клавіші миші "вибирає" поточну стрічку (змінює їй сттиль background - підсвічує її). В style {} об'єкті прописана умова, при якій буде той чи інший колір у рядка. 

        // key стрічки який співпаде зі змінною selectedrow буде підсвічений (змінить background)

        const MakeRow = (props) => {
          return (
            <Tr key={props.personalData.name.first} style = {{
              background: selectedRow === props.personalData.name.first ? 'orange' : 'transparent',
              cursor: 'pointer'
              
          }}
          onMouseEnter={() => setSelectedRow(props.personalData.name.first)} fontSize={{sm: '18px', lg: '21px', xl: '26px'}}>
              {isSmallerScreenForGender ? null : <Td>{props.personalData.gender}</Td>}
              <Td>{props.personalData.name.first}</Td>
              <Td>{props.personalData.name.last}</Td>
              {isSmallerScreenForCell ? null : <Td>{props.personalData.cell}</Td>}
              {isSmallerScreenForEmail ? null : <Td>{props.personalData.email}</Td>}
              <Td>{props.personalData.dob.age}</Td>
          </Tr>
          )
        }

        const arrayLength = props.data.length

        return (
          
          
            Array(arrayLength).fill().map((_, index) => (
              <MakeRow key = {index} personalData = {selectPerson(props.data, index)} />
            ) )
          
        )

        // в return данного компонену використовється одна цікава приблуда для множинного (кількість рендерів вказується аргументом функції) рендеру дочірнього компоненту. Створюється массив даних з потрібною кількістю елементів і за допомогою методу .fill() (якщо не вказати аргументу для методу fill, то він заповнить массив елементами undefined, але це не важливо в данному випадку) данний массив заповнюється елементами. Потім використовується метод map для рендеsру компоненту в потрібній кількості.
    }



// main return 

    return (
      
        <TableContainer >
  <Table>
    <TableCaption>People information</TableCaption>
    <Thead>
      <Tr>
        {isSmallerScreenForGender ? null : <Th>Gender</Th>}
        <Th>First Name</Th>
        <Th>Last Name</Th>
        {isSmallerScreenForCell ? null : <Th>Cell</Th>}
        {isSmallerScreenForEmail ? null : <Th>Email</Th>}
        <Th>Age</Th>
      </Tr>
    </Thead>
    <Tbody>
      <MakeTableData data = {props.data} />
    </Tbody>
    
  </Table>
</TableContainer>
      
    )
}

