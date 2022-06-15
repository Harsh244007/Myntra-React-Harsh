import React, { useEffect, useState } from 'react'
import {
  Box, Text
   ,Menu,
  MenuButton,
  MenuList,
  // MenuItem,
  MenuItemOption,
  // MenuGroup,
  MenuOptionGroup,Button,
  MenuDivider, Checkbox, CheckboxGroup, VStack
} from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
import { fetchData } from '../Redux/products/action'
import { useDispatch } from 'react-redux'

const FilterComponent = () => {
const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
// console.log(searchParams)
  const [categoryValues,setCategoryValues]=useState(searchParams.getAll('category')||[])
  const categoryHandler = (values) => {
    console.log(values)
    setCategoryValues(values)
    // console.log(setCategoryValues,categoryValues)
  }
  useEffect(() => 
  {
    if (categoryValues) {
      setSearchParams({ category: categoryValues }, { replace: true });
      let params = {
        category:searchParams.getAll('category')
      }
      dispatch(fetchData(params))
    }
      
  },[categoryValues,searchParams,dispatch,setSearchParams])
  return (
    <Box>
    <Box display={{base:'none', md:'block'}} p="1rem 2rem" ><Text fontSize="2xl">Filters</Text>
      <Text>Category</Text>
      <CheckboxGroup defaultValue={categoryValues} onChange={ categoryHandler}>
    <VStack alignItems={"baseline"}  >
  <Checkbox size='sm'value="mens" colorScheme='red'>
    Mens
  </Checkbox>
  <Checkbox value="bags" size='md' colorScheme='green' >
    Bags
  </Checkbox>
<Checkbox value="women" size='lg' colorScheme='orange' >
    Women
  </Checkbox>
      </VStack>
    </CheckboxGroup>
      </Box >
      <Box display={{base:'block',md:'none'}}>
    <Menu closeOnSelect={false} onClick={ categoryHandler}>
  <MenuButton as={Button} colorScheme='blue'>
    MenuItem
  </MenuButton>
  <MenuList minWidth='240px'>
    <MenuOptionGroup defaultValue='asc' title='Order' type='radio'>
      <MenuItemOption value='asc'>Ascending</MenuItemOption>
      <MenuItemOption value='desc'>Descending</MenuItemOption>
    </MenuOptionGroup>
    <MenuDivider />
    <MenuOptionGroup title='Country' type='checkbox'>
      <MenuItemOption value='email'>Email</MenuItemOption>
      <MenuItemOption value='phone'>Phone</MenuItemOption>
      <MenuItemOption value='country'>Country</MenuItemOption>
    </MenuOptionGroup>
  </MenuList>
        </Menu>
        </Box>
    </Box>
  )
}

export default FilterComponent