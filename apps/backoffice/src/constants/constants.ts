export const ProductProperties = {
    activo: null,
    atributos: null,
    cantidad: null,
    categorias: null,
    descripcion: null,
    ean13: null,
    id: null,
    imagen: null,
    marca: null,
    metadescription: null,
    metakeywords: null,
    metatitle: null,
    nombre: null,
    pvp: null,
    pvpr: null,
    referencia: null,
    value: null,
    actividad: null,
    artcodigo: null,
    artnombre: null,
    año: null,
    botín: null,
    cantidadminima: null,
    capacidad: null,
    chasis: null,
    codarancelario: null,
    codpais: null,
    colorbase: null,
    colorcodigo: null,
    colornombre: null,
    composición: null,
    construcción: null,
    descripcionlarga: null,
    dimensiones: null,
    enmultiplosde: null,
    estacion: null,
    fedas: null,
    familia: null,
    foto: null,
    foto10: null,
    foto11: null,
    foto12: null,
    foto2: null,
    foto3: null,
    foto4: null,
    foto5: null,
    foto6: null,
    foto7: null,
    foto8: null,
    foto9: null,
    freno: null,
    guía: null,
    noservirantesde: null,
    perfil: null,
    pesoaproximado: null,
    rodamiento: null,
    ruedaspatines: null,
    sku: null,
    talleur: null,
    talla: null,
    tecnología: null,
    tipocierre: null,
    upc: null,
    udsxpack: null,
    vendoritemno: null,
    deleteimages: null,
    plazoentrega: null,  // "plazo de entrega" without spaces
    precioimpuestosincluidos: null, // "precio impuestos incluidos" without spaces
    attribute: null,
    codigo: null,
    active: null,
    brand: null,
    color: null,
    estado: null,
    image: null,
    nom: null,
    pvd: null,
    reference: null,
    reforigin: null,
    sizes: null,
    stock: null,
    refmere: null,
    size: null,
};

export const changeColor = (originColor: string) => {
  switch (originColor) {
    case 'BK':
    case 'BLK':
      return 'Negro'
      break
    case 'BL':
      return 'Azul'
      break
    case 'BG':
      return 'Rosa chicle'
      break
    case 'CRBN':
    case 'R':
      return 'Carbon'
      break
    case 'DA':
      return 'Negro Transparente'
      break
    case 'CL':
      return 'Blanco Transparente'
      break
    case 'CO':
      return 'Coral'
      break
    case 'GD':
      return 'Dorado'
      break
    case 'GR':
      return 'Verde'
      break
    case 'GY':
    case 'GRY':
      return 'Gris'
      break
    case 'GL':
      return 'Gris Perla'
      break
    case 'NL':
      return 'Marrón'
      break
    case 'NY':
    case 'NV':
      return 'Azul Oscuro'
      break
    case 'LB':
      return 'Azul flojo'
      break
    case 'PK':
      return 'Rosa'
      break
    case 'PU':
      return 'Violeta'
      break
    case 'OR':
      return 'Naranja'
      break
    case 'RED':
    case 'RD':
      return 'Rojo'
      break
    case 'SILVER':
    case 'SL':
    case 'SV':
      return 'Plata'
      break
    case 'YE':
    case 'YL':
      return 'Amarillo'
      break
    case 'VI':
      return 'Violeta'
      break
    case 'WH':
      return 'Blanco'
      break
    default:
      break
  }
}

export const changeSize = (originSize: string) => {
  switch (originSize) {
    case '2 - 4':
    case '2':
      return '32-34'
      break
    case '5 - 8':
      return '37-39'
      break
    case '9 - 12':
      return '40-42'
      break
    case '4 - 6':
      return '35-37'
      break
    case '2730':
      return '27-30'
      break
    case '2734':
      return '27-34'
      break
    case '2932':
      return '29-32'
      break
    case '3336':
      return '33-36'
      break
    case '3538':
      return '35-38'
      break
    case '3740':
      return '37-40'
      break
    case '34':
      return '34'
      break
    case '35':
      return '35'
      break
    case '36':
      return '36'
      break
    case '36 - 38':
      return '36-38'
      break
    case '37':
    case '5':
      return '37'
      break
    case '38':
      return '38'
      break
    case '6':
      return '38-39'
      break
    case '39':
      return '39'
      break
    case '39 - 41':
      return '39-41'
      break
    case '40':
    case '7':
      return '40'
      break
    case '405':
      return '40.5'
      break
    case '41':
    case '8':
      return '41'
      break
    case '415':
      return '41.5'
      break
    case '42':
    case '9':
      return '42'
      break
    case '42 - 44':
      return '42-44'
      break
    case '425':
      return '42.5'
      break
    case '43':
    case '10':
      return '43'
      break
    case '435':
      return '43.5'
      break
    case '44':
    case '11':
      return '44'
      break
    case '445':
      return '44.5'
      break
    case '45':
    case '12':
      return '45'
      break
    case '45 - 47':
      return '45-47'
      break
    case '46':
    case '13':
      return '46'
      break
    case '47':
      return '47'
      break
    case '48':
      return '48'
      break
    case 'JR':
      return 'Junior'
      break
    case 'XXL':
      return 'DobleExtraLargo'
      break
    case 'XXXL':
      return 'TripleExtraLargo'
      break
    case 'XL':
      return 'ExtraLargo'
      break
    case 'L':
      return 'Largo'
      break
    case 'M':
      return 'Medium'
      break
    case 'S':
      return 'Small'
      breakc
    case 'XS':
      return 'ExtraSmall'
      break
    case 'XXS':
      return 'DobleExtraSmall'
      break
      case '72':
        return '72mm'
        break
      case '80':
        return '80mm'
        break
      case '76':
        return '76mm'
        break
      case '100':
        return '100mm'
        break
      case '110':
        return '110mm'
        break
      case '125':
        return '125mm'
        break
    case 'undefined':
      return ""
      break;
    default:
      break
  }
}