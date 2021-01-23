import React from 'react'
import './App.css'
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import { Sentry } from 'react-activity';
import 'react-activity/dist/react-activity.css';
// const movies = [
//   { title: 'Spongebob', category: 'kartun', image: 'https://static01.nyt.com/images/2018/05/03/us/03spongebob_xp/03spongebob_xp-videoSixteenByNineJumbo1600.jpg', description: 'ini adalah sebuah film dengan sutradara blabalbala...' },
//   { title: 'Avengers', category: 'action', image: 'https://businessolympian.com.au/wp-content/uploads/2017/12/superhero-1024x544.jpg', description: 'ini adalah sebuah film dengan sutradara blabalbala...' },
//   { title: 'Aquaman', category: 'action', image: 'https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_.jpg', description: 'ini adalah sebuah film dengan sutradara blabalbala...' },
//   { title: 'DC', category: 'action', image: 'https://www.dccomics.com/sites/default/files/DCVol2Marquee_57466713405381.60938022.jpg', description: 'ini adalah sebuah film dengan sutradara blabalbala...' },
// ]

// const HomePage = () => {
//   return(
//     <div>ini Homepage</div>
//   )
// }

// const Login = () => {
//   return(
//     <div>ini Login</div>
//   )
// }

// const App = () => {
//   return(
//     <Login />
//   )
// }
const App = () => {
  const [wishlist, setWishlist] = React.useState(0)
  const [detail, setDetail] = React.useState({})
  const [openModal, setOpenModal] = React.useState(false)
  const [photos, setPhotos] = React.useState([])

  const lihatDetail = (itemDetail) => {
    setDetail(itemDetail)
    setOpenModal(true)
  }
  React.useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/photos').then((res) => {
      setPhotos(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <>
      {/* <h3>Daftar Yang akan di tonton: {wishlist}</h3> */}
      {photos == '' ? (<center><div style={{ marginTop: 50 }}><Sentry color="#727981" size={32} speed={1} animating={true} /></div></center>) : photos.map((item, index) => {
        return (<>
          <div className='item' style={{ background: '#0087ff', color: '#fff' }}>
            <img src={item.url} />
            <h3>{item.title}</h3>
            <button className='btn btn-primary'>Lihat Detail</button>
          </div>
        </>)
      })}
      {/* {movies.map((item, index) => {
        if (index == 0) {
          return (
            <div className='item' style={{ background: '#0087ff', color: '#fff' }}>
              <img src={item.image} />
              <h3>{item.title}</h3>
              <span>Kategori: {item.category}, info: {item.category == 'kartun' ? 'Tontonan Anak Kecil' : 'Tontonan Remaja dan Orang Tua'}</span>
              <button  className='btn btn-primary' onClick={() => lihatDetail(item)}>Lihat Detail</button>
            </div>
          )
        }
        return (<>
          <div className='item'>
            <img src={item.image} />
            <h3>{item.title}</h3>
            <span>Kategori: {item.category}, info: {item.category == 'kartun' ? 'Tontonan Anak Kecil' : 'Tontonan Remaja dan Orang Tua'}</span>
            <br/><button className='btn btn-primary' onClick={() => lihatDetail(item)}>Lihat Detail</button>
          </div>
        </>)
      })} */}

      <SwipeableBottomSheet open={openModal} onChange={() => {
        setOpenModal(false)
        setDetail({})
      }} overflowHeight={0}>
        <div style={{ height: 'auto', padding: 15 }}>
          <h4>Detail Film:</h4>
          <img src={detail.image} style={{ width: '100%' }} />
          <p>Judul: {detail.title}</p>
          <p>Kategori: {detail.category}</p>
          <p>Deskripsi: {detail.description}</p>
        </div>
      </SwipeableBottomSheet>
    </>
  )
}


export default App