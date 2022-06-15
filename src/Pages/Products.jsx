import { Box, Stack,Center,
  useColorModeValue,
  Heading,
  Text,
  Image, 
  Flex} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import FilterComponent from "../Components/FilterComponent";
// import { store } from "../Redux/store";
import { fetchData } from "../Redux/products/action"
import axios from "axios"

const Products = () => {
    // console.log("double")
  const products = useSelector((store) =>  store.ecommerceData.products)
  // console.log(products)  
  const [searchParams]=useSearchParams()
  const dispatch =useDispatch()
  useEffect(() => {
    if (products.length === 0) {
      let params = {
        category: searchParams.getAll('category')
      }
      dispatch(fetchData(params));
    }
  },[dispatch,products?.length,searchParams])
  // console.log(products)
  
axios.get("http://188.166.98.109:5000/num").then((r)=>console.log(r.data[0].products)).catch((e)=>console.log(e))

  return (
    <Box>
      <Stack display={{ md: 'flex' }} flexDirection={{md:"row"} }>
      <Box>
        <FilterComponent />
        </Box>
        <Box>
          <Heading as="h3">Products</Heading>
          <Flex flexWrap="wrap" justifyContent="space-around">
            {products.map(product => 
            {
              return <ProductSimple key={product.key} image={product.image} title={product.title} price={product.price}/>
            }
            )
            }
          </Flex>
    
        </Box>
        </Stack>
    </Box>
  );
};

function ProductSimple({image, title, price}) {

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'contain'}
            src={image}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          {/* <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text> */}
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {title}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
             ${price}
            </Text>
            {/* <Text textDecoration={'line-through'} color={'gray.600'}>
              ${price}
            </Text> */}
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}


export default Products;
