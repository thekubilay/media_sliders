import {onMounted, ref} from "vue";

export default function () {
  const images = ref([
    {image: "img/image1.jpg", width: "100px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image4.jpg", width: "30px"},
    {image: "img/image5.jpg", width: "120px"},
    {image: "img/image6.jpg", width: "150px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image7.jpg", width: "70px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image8.jpg", width: "140px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image5.jpg", width: "120px"},
    {image: "img/image6.jpg", width: "150px"},
    {image: "img/image7.jpg", width: "70px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image8.jpg", width: "140px"},
    {image: "img/image1.jpg", width: "100px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image4.jpg", width: "30px"},
    {image: "img/image5.jpg", width: "120px"},
    {image: "img/image6.jpg", width: "150px"},
    {image: "img/image7.jpg", width: "70px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image8.jpg", width: "140px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image8.jpg", width: "140px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image5.jpg", width: "120px"},
    {image: "img/image6.jpg", width: "150px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image8.jpg", width: "140px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image5.jpg", width: "120px"},
    {image: "img/image6.jpg", width: "150px"},
    {image: "img/image1.jpg", width: "100px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image4.jpg", width: "30px"},
    {image: "img/image5.jpg", width: "120px"},
    {image: "img/image6.jpg", width: "150px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image7.jpg", width: "70px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image8.jpg", width: "140px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image5.jpg", width: "120px"},
    {image: "img/image6.jpg", width: "150px"},
    {image: "img/image7.jpg", width: "70px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image8.jpg", width: "140px"},
    {image: "img/image1.jpg", width: "100px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image4.jpg", width: "30px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image8.jpg", width: "140px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image5.jpg", width: "120px"},
    {image: "img/image6.jpg", width: "150px"},
    {image: "img/image7.jpg", width: "70px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image8.jpg", width: "140px"},
    {image: "img/image1.jpg", width: "100px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image4.jpg", width: "30px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image8.jpg", width: "140px"},
    {image: "img/image9.jpg", width: "50px"},
    {image: "img/image10.jpg", width: "30px"},
    {image: "img/image13.jpg", width: "120px"},
    {image: "img/image11.jpg", width: "120px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image5.jpg", width: "120px"},
    {image: "img/image6.jpg", width: "150px"},
    {image: "img/image1.jpg", width: "100px"},
    {image: "img/image2.jpg", width: "120px"},
    {image: "img/image3.jpg", width: "50px"},
    {image: "img/image4.jpg", width: "30px"},
    {image: "img/image5.jpg", width: "120px"},
    {image: "img/image6.jpg", width: "150px"},
    {image: "img/image12.jpg", width: "100px"},
    {image: "img/image13.jpg", width: "120px"},
  ]);

  return {
    images
  }
}