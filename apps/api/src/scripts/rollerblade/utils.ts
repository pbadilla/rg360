// const changeFamily = (item: string) => {
//     switch (item) {
//       case 'ACCESORIOS TEXTIL':
//       case 'CASCOS':
//       case 'GUANTES':
//       case 'MOCHILAS Y BOLSAS':
//         return 'Accesorios'
//         break;
//       case 'PROTECCIONES':
//         return 'Protecciones';
//         break;
//       case 'COMPONENTES Y RECAMB':
//         return 'Recambios'
//         break;
//       case 'PATINES BLADERUNNER':
//       case 'PATINES ROLLERBLADE':
//         return 'Patines'
//         break;
//       default:
//         break;
//     }
//   }

//   function truncateString(str:string, max:number) {
//     if(str && str.length > 0 ) {
//       if(str.length > max) {
//         return str.substring(0, length - 3);
//       } else { 
//         return str
//       };
//     } else {
//       return '';
//     };
//   }


// const fotoIsValid = (photos: []) => {

//   const existPhotos = photos.filter(item => item);

//   const withoutQuotes = JSON.stringify(existPhotos).replace (/"/g,'').replace ("[",'').replace ("]",'') ;

//   if (typeof withoutQuotes !== 'undefined' && withoutQuotes.length > 0) {
//     return withoutQuotes
//   } else return '';
// }

//   const productsToExport =(products) => {
//     const productsList = [];
//     products.map((item, index: number) => {

//       const photos = fotoIsValid ([item.Foto3, item.Foto4, item.Foto5, item.Foto6, item.Foto7, item.Foto8]);

//       productsList.push({
//         id: item.id,
//         active: 0,
//         name: item.ArtNombre,
//         SKU: item.SKU,
//         pvp: item.PVPR,
//         taxRulesID: 1,
//         reference: item.VendorItemNo,
//         brand: item.Marca,
//         ean13: item.EAN,
//         plazoEntrega: '2-4 dias',
//         description: item.FEDAS,
//         images: photos,
//         metaTitle: item.ArtNombre,
//         metaKeywords: changeFamily(item.Familia),  
//         metaDescription: truncateString(item.FEDAS, 500)
//       })
//     })
//     return productsList;
//   }

//   const groupProductsList = (products) => {
//     const productsList = [];
//     const grouped = _.mapValues(_.groupBy(products, 'VendorItemNo')); 
//     for (const [key, value] of Object.entries(grouped)) {
//       productsList.push(value[0])
//     }
//     setPending(false);
//     return productsList;
//   }