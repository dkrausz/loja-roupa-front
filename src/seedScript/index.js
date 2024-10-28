import SuperFakerBrasil from "faker-brasil";
import axios from "axios";

const api = axios.create({
  baseURL: "https://loja-roupas.onrender.com",
  //baseURL: "http://localhost:3000",
  timeout: 5 * 1000,
});

const superFakerBrasil = new SuperFakerBrasil();
const qtd = 100;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NMZXZlbCI6IkFETSIsImlhdCI6MTczMDEyMTU1NCwiZXhwIjoxNzMwMjA3OTU0LCJzdWIiOiJiODAyNzNhMS0zMDE2LTRhYWYtYmMyYi00ODZiOGNmYTA0ZGUifQ.7JVREQG3V5nne6aAlQhonhcy-4uI4hLODj6a_IIjBAc";
//const token =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NMZXZlbCI6IkFETSIsImlhdCI6MTczMDEyMzQwNCwiZXhwIjoxNzMwMjA5ODA0LCJzdWIiOiIxNWU3OTc5NS1mZGYxLTQyNDAtODdlMi02ODAxZTIyY2UyZjAifQ.QyCgm7PB_bftjXgabnk89c2uhSTQEvE3xbzkOFRVR-4";

const newProduct = () => {
  const product = {
    name: superFakerBrasil.clothesProduct(false).product,
    description: "Esta peça é confeccionada com tecido de alta qualidade, proporcionando conforto e estilo para diversas ocasiões. ",
    price: superFakerBrasil.clothesProduct(false).price * 100,
  };
  return product;
};

const seed = async () => {
  for (let i = 0; i < qtd; i++) {
    const product = newProduct();
    console.log(product);

    const {data} = await api.post(`products`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log(data);
  }
};

seed();
