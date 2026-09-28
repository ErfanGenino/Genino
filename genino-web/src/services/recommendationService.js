// src/services/recommendationService.js


export async function getRecommendedProducts(
  productId,
  childId = null
){

  try {


    let url =
    `${import.meta.env.VITE_API_BASE_URL}/vendor-products/public/${productId}/recommended`;



    if(childId){

      url +=
      `?childId=${childId}`;

    }




    const response =
      await fetch(url);



    const data =
      await response.json();



    if(!data.ok){

      return [];

    }



    return data.products || [];



  }catch(error){


    console.error(
      "GET RECOMMENDED PRODUCTS ERROR:",
      error
    );


    return [];

  }

}