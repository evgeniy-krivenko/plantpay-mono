import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IImageElement } from '@plantpay-mono/types';
import $api from '../../../http';

export interface ImageForUpload {
  requestId?: string;
  file?: File;
  src: string;
  isLoading?: boolean;
  progress?: number;
  error?: string;
  imageId?: string;
}

export const initialState = {
  imagesForUpload: [] as ImageForUpload[],
  images: [] as IImageElement[],
  name: '',
  description: '',
  price: 0,
  categoryId: -1,
  error: '',
  isLoading: false,
};

export const productLoaderSlice = createSlice({
  name: 'productLoader',
  initialState,
  reducers: {
    setUploadProgress: (state, { payload }: PayloadAction<Pick<ImageForUpload, 'progress' | 'requestId'>>) => {
      for (const image of state.imagesForUpload) {
        if (image.requestId === payload.requestId) {
          image.progress = payload.progress;
          break;
        }
      }
    },
    setMainImage: (state, action: PayloadAction<string>) => {
      for (const image of state.images) {
        image.isMain = image.id === action.payload;
      }
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    resetProductLoaderStore: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadPhoto.pending, (state, action) => {
      state.imagesForUpload.push({ requestId: action.meta.requestId, isLoading: true, src: action.meta.arg.src });
    });
    builder.addCase(uploadPhoto.fulfilled, (state, action) => {
      state.images.push(action.payload);
      for (const image of state.imagesForUpload) {
        if (image.requestId === action.meta.requestId) {
          image.imageId = action.payload.id;
          image.src = action.payload.url;
          image.isLoading = false;
          break;
        }
      }
    });
    builder.addCase(uploadPhoto.rejected, (state, action) => {
      for (const image of state.imagesForUpload) {
        if (image.requestId === action.meta.requestId) {
          image.error = action.payload;
          break;
        }
      }
    });
  },
});

export default productLoaderSlice.reducer;

export const { actions: productLoaderActions } = productLoaderSlice;

// async actions
export const uploadPhoto = createAsyncThunk<IImageElement, ImageForUpload, { rejectValue: string }>(
  'productLoader/uploadPhoto',
  async ({ file }, thunkAPI) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await $api.post('files/product/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: ({ loaded, total }: ProgressEvent) => {
          const progress = Math.floor((loaded * 100) / total);
          thunkAPI.dispatch(productLoaderActions.setUploadProgress({ progress, requestId: thunkAPI.requestId }));
        },
      });
      return response?.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Что-то пошло не так, попробуйте позже');
    }
  },
);

