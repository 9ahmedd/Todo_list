import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  data: null,
  addData:null,
  updateData:null,
  deleteData:null,
  isError: false,
};

const baseURL = `https://6689300e0ea28ca88b873ba5.mockapi.io/`;


export const todoApi = createAsyncThunk("get/todo", async () => {
  try {
    const response = await axios.get(`${baseURL}todo`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data; // Throw error response data for handling in reducers
  }
});
export const addApi = createAsyncThunk("post/todo", async (addData) => {
  try {
    const response = await axios.post(`${baseURL}todo`,addData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data; // Throw error response data for handling in reducers
  }
});
export const updateTaskApi = createAsyncThunk(
  "update/todo",
  async (updateData) => {
    try {
      const response = await axios.put(`${baseURL}todo/${updateData?.id}`, updateData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.data);
      return error.data;
    }
  }
);

export const deleteTaskApi = createAsyncThunk(
  "delete/todo",
  async (id) => {
    try {
      const response = await axios.delete(
        `${baseURL}todo/${id}`,
      );
     
      return response.data;
    } catch (error) {
      console.log(error.data);
      return error.data;
    }
  }
);

export const Api = createSlice({
  name: "todos",
  initialState,
  reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(todoApi.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset error state
          })
          .addCase(todoApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(todoApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(addApi.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset error state
          })
          .addCase(addApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addData = action.payload;
          })
          .addCase(addApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(updateTaskApi.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset error state
          })
          .addCase(updateTaskApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updateData = action.payload;
          })
          .addCase(updateTaskApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(deleteTaskApi.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset error state
          })
          .addCase(deleteTaskApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.deleteData = action.payload;
          })
          .addCase(deleteTaskApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          });
    }
});

export default Api.reducer;
