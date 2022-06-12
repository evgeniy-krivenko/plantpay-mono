import React, {
  DetailedHTMLProps,
  DragEvent,
  FC,
  FormEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { DropArrowSvg, UploadSvg, UploadPlusSvg, MainImageSvg } from '@plantpay-mono/svg';
import styles from './PhotoLoader.module.scss';
import cn from 'classnames';
import { ScreenProps } from '../../AddProductPopup';
import { useActions } from '../../../../hooks/useActions';
import { useTypeSelector } from '../../../../hooks/useTypeSelector';
import {
  imagesUploadSelector,
  isHaveImagesUploadSelector,
  isMaxImagesSelector,
  mainImageSelector,
} from '../../../../store/reducers/productLoader/selectors';
import { ImageForUpload } from '../../../../store/reducers/productLoader/photoLoaderReducer';
import { OverlaingPopup, ProgressBar } from '@plantpay-mono/ui';
import { AddProductScreenContentWrapper } from '../AddProductScreenContentWrapper/AddProductScreenContentWrapper';

let timeout;

export interface PhotoLoaderProps extends ScreenProps {
  type?: string;
}

interface FileDropLoaderProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

interface ImageWithProgressItemProps {
  image: ImageForUpload;
  onClick: (string) => void;
  mainImageId?: string;
}

interface DropDownPopupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpened: boolean;
}

const FileDropLoader: FC<FileDropLoaderProps> = ({ id, className, onInput, ...otherProps }) => {
  return (
    <div className={cn(styles.inputContainer)}>
      <label className={cn(styles.loader, className)} htmlFor={id}>
        <input className={styles.input} id={id} onInput={onInput} {...otherProps} />
        <UploadSvg />
      </label>
      <p className={styles.text}>Выберите или перетащите фото</p>
    </div>
  );
};

const ImageWithProgressItem: FC<ImageWithProgressItemProps> = ({ image, onClick, mainImageId }) => {
  const { progress, isLoading, src, imageId } = image;
  const isMain = imageId === mainImageId;
  const onImageClick = (): void => {
    onClick(image.imageId);
  };
  return (
    <div
      className={cn(styles.image, {
        [styles.loading]: isLoading,
      })}
    >
      {isLoading && <ProgressBar className={styles.progress} progress={progress} />}
      <img
        className={cn({
          [styles.active]: isMain,
        })}
        src={src}
        width="96"
        height="96"
        onClick={onImageClick}
      />
    </div>
  );
};

const DropDownPopup: FC<DropDownPopupProps> = ({ isOpened, onDrop }) => {
  return (
    <OverlaingPopup isOpened={isOpened} overlaid={false}>
      <div className={styles.onDrop} onDrop={onDrop}>
        <DropArrowSvg />
        <p className={styles.text}>Отпустите фото, чтобы начать загрузку</p>
      </div>
    </OverlaingPopup>
  );
};

export const PhotoLoader: FC<PhotoLoaderProps> = ({ onNextButtonClick }) => {
  const isHaveImagesForUpload = useTypeSelector(isHaveImagesUploadSelector);
  const imagesForUpload = useTypeSelector(imagesUploadSelector);
  const mainImage = useTypeSelector(mainImageSelector);
  const isMaxImages = useTypeSelector(isMaxImagesSelector);
  const { resetIsSuccessCreateProduct } = useActions();

  const [isDrag, setDrag] = useState(false);
  const { uploadPhoto, setMainImage } = useActions();

  /**
   * Сбрасываем стейт успешного добавления продукта,
   * так как предполагается, что это новый продукт
   */
  useEffect(() => {
    resetIsSuccessCreateProduct();
  }, []);

  const onDragStartHandler = (e: DragEvent): void => {
    e.preventDefault();
    if (isMaxImages) {
      return;
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setDrag(true);
    }, 10);
  };

  const onDragLeaveHandler = (e: DragEvent): void => {
    e.preventDefault();
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setDrag(false);
    }, 10);
  };

  const onClickImageHandler = useCallback(
    (imageId): void => {
      setMainImage(imageId);
    },
    [setMainImage],
  );

  const onDropHandler = (e: DragEvent): void => {
    e.preventDefault();
    if (isMaxImages) {
      return;
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setDrag(false);
    }, 10);
    const fileCount = e.dataTransfer.files.length;
    const counter = fileCount < 5 ? fileCount : 5;
    for (let i = 0; i < counter; i++) {
      const file = e.dataTransfer.files.item(i);
      const src = URL.createObjectURL(file);
      uploadPhoto({ file, src });
    }
  };

  const onInputHandler = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const fileCount = e.currentTarget.files.length;
    const counter = fileCount < 5 ? fileCount : 5;
    for (let i = 0; i < counter; i++) {
      const file = e.currentTarget.files.item(i);
      const src = URL.createObjectURL(file);
      uploadPhoto({ file, src });
    }
  };

  return (
    <>
      <AddProductScreenContentWrapper
        title="Внешний вид"
        subtitle="Добавьте до 5 фото"
        buttonText="Продолжить"
        disabled={!mainImage}
        onClickButton={onNextButtonClick}
        showButton={isHaveImagesForUpload}
        onDragStart={onDragStartHandler}
        onDragLeave={onDragLeaveHandler}
        onDragOver={onDragStartHandler}
      >
        {isDrag && <DropDownPopup onDrop={onDropHandler} onDragLeave={onDragLeaveHandler} isOpened={isDrag} />}
        {isHaveImagesForUpload ? (
          <>
            <div className={styles.imagesWrapper}>
              <div className={styles.images}>
                {imagesForUpload.map((image) => (
                  <ImageWithProgressItem
                    key={image.requestId}
                    image={image}
                    onClick={onClickImageHandler}
                    mainImageId={mainImage?.id}
                  />
                ))}
                {!isMaxImages && (
                  <label className={styles.loaderSmall} htmlFor="smallFileUploader">
                    <input
                      className={styles.input}
                      id="smallFileUploader"
                      onInput={onInputHandler}
                      type="file"
                      multiple
                      accept=".png, .jpg, .jpeg"
                    />
                    <UploadPlusSvg />
                  </label>
                )}
              </div>
              <div className={styles.mainImageContainer}>
                <div className={styles.mainImageText}>Главное фото</div>
                {mainImage ? (
                  <img
                    className={styles.mainImage}
                    src={mainImage?.url || ''}
                    width="240"
                    height="300"
                  />
                ) : (
                  <div className={styles.imageMock}>
                    <MainImageSvg />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <FileDropLoader onInput={onInputHandler} id="fileLoader" type="file" multiple accept=".png, .jpg, .jpeg" />
        )}
      </AddProductScreenContentWrapper>
    </>
  );
};
