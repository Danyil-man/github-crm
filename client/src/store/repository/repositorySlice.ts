import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux";
import { IRepository, IRepositoryResponse } from "../../types/IRepository";

export interface RepositoriesState {
  repositories: IRepository[];
  total: number;
}

const initialState: RepositoriesState = {
  repositories: [],
  total: 0,
};

export const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    getAllRepositories: (state, action: PayloadAction<IRepositoryResponse>) => {
      state.repositories = action.payload.repositories;
      state.total = action.payload.total;
    },
    addNewRepository: (state, action: PayloadAction<IRepository>) => {
      state.repositories.push(action.payload);
      state.total = state.total + 1;
    },
    removeRepoById: (state, action: PayloadAction<string>) => {
      state.repositories = state.repositories.filter(
        (repo) => repo._id.toString() !== action.payload
      );
      state.total = state.total - 1;
    },
  },
});

export const { getAllRepositories, removeRepoById } = repositorySlice.actions;

export const selectRepo = (state: RootState) => state.repository;
export const repositoryReducer = repositorySlice.reducer;
