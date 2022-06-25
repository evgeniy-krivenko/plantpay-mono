import React, { FC, useState } from 'react';
import { IImageElement } from '@plantpay-mono/types';
import styles from './ProductScreen.module.scss';
import cn from 'classnames';

export interface ProductScreenImagesProps {
  images: IImageElement[];
}

const ProductScreenImages: FC<ProductScreenImagesProps> = ({ images }) => {
  let mainImage;
  for (const image of images) {
    if (image.isMain) {
      mainImage = image;
      break;
    }
  }
  const [activeImage, setActiveImage] = useState<IImageElement>(mainImage);
  return (
    <div className={styles.images}>
      <div className={styles.imagesPreview}>
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(styles.imagePreview, {
              [styles.active]: image.id === activeImage.id,
            })}
          >
            <img onClick={() => setActiveImage(image)} src={image.url} alt="sdf" />
          </div>
        ))}
      </div>
      <div className={styles.mainImage}>
        <img src={activeImage.url} alt="sdaf" />
      </div>
    </div>
  );
};

export default ProductScreenImages;
