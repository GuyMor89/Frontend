import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import { faSleigh } from '@fortawesome/free-solid-svg-icons/faSleigh'

export function ImgUploader({ user, addAvatar }) {

    const [isUploading, setIsUploading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    async function uploadImg(ev) {
        ev.preventDefault()
        setIsUploading(true)

        const { secure_url } = await uploadService.uploadImg(ev)

        // setImgData({ imgUrl: secure_url, })
        addAvatar(user._id, secure_url)
        setIsDragging(false)
        setIsUploading(false)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    function handleImg() {
        if (isUploading) return <div className='loader-medium'></div>
        if (!isUploading && user.imgURL) return <img src={user.imgURL} />
        if (!isUploading && !user.imgURL) return <img src={'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'} />
    }

    return (
        <div className={`userImg ${isDragging && !isUploading && 'drag'}`}>
            {/* <div >{getUploadLabel()}</div> */}


            <label
                onDrop={uploadImg}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {handleImg()}
                {/* <img src={user.imgURL || 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'} style={{ width: '100px', height: '100px', border: dragBorder }} /> */}
                <input
                    hidden
                    type="file"
                    onChange={uploadImg} accept="img/*" />
            </label>

        </div>
    )
}








