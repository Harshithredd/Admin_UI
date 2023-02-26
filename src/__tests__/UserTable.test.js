import { act, cleanup, fireEvent, render, screen, waitFor ,waitForElement} from "@testing-library/react";
import Search from "../components/Search";
import store from "../store";
import userEvent from "@testing-library/user-event";
import axiosMock from "axios";
import { Provider } from 'react-redux';
import { config } from "../App";
import { wait } from "@testing-library/user-event/dist/utils";
import UserTable from "../components/UserTable";
import '@testing-library/jest-dom/extend-expect';
import Header from "../components/Header";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import PaginationController from "../components/PaginationController";

store.subscribe(()=>{});
jest.useFakeTimers();

const userResponceData={
    data : [
        {
          "id": "1",
          "name": "Aaron Miles",
          "email": "aaron@mailinator.com",
          "role": "member"
        },
        {
          "id": "2",
          "name": "Aishwarya Naik",
          "email": "aishwarya@mailinator.com",
          "role": "member"
        },
        {
          "id": "3",
          "name": "Arvind Kumar",
          "email": "arvind@mailinator.com",
          "role": "admin"
        }
      ]
} 


describe("Header Component",()=>{
    it("Show the header title",()=>{
        render( <Header/>)
        const HeaderTitle = screen.getByText(/ADMIN UI/i);
        expect(HeaderTitle).toBeInTheDocument();
    })
    
}) 

describe("Search Component", ()=>{
    beforeEach(()=>{
        axiosMock.get.mockResolvedValueOnce( userResponceData);
        render( <Provider store={store}>
            <Search />
            <UserTable/>
        </Provider>)
    })
    afterEach(cleanup);

    it("check search bar is displayed", async () => {
        let search = screen.getByPlaceholderText("Search by name email or role");
        expect(search).toBeInTheDocument()
      });

    it("search for user in displayed Users", async () => {
        // We'll be explicit about what data Axios is to return when `get` is called.
       
        const url = `${config.endpoint}adminui-problem/members.json`;
        expect(screen.getByTestId("loading")).toHaveTextContent("LOADING...........");
        let search = screen.getByPlaceholderText("Search by name email or role");
        userEvent.type(search, "Aaron");
        await waitFor(()=>{
            screen.debug();
            let userName =screen.getByText(/Aaron Miles/);
            expect(userName).toBeInTheDocument();
            let userNameNotToBe =screen.queryByText(/Aishwarya/);
            expect(userNameNotToBe).not.toBeInTheDocument();
            
        })
 
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledWith(url);
      });
    
})    


describe("User Table Component", ()=>{
    beforeEach(()=>{
        axiosMock.get.mockResolvedValueOnce( userResponceData);
        render( <Provider store={store}>
            <Search />
            <UserTable/>
        </Provider>)
    })
    afterEach(cleanup);

    it("fetches and displays userdata", async () => {
        const url = `${config.endpoint}adminui-problem/members.json`;
        expect(screen.getByTestId("loading")).toHaveTextContent("LOADING...........");
        await waitFor(() => {
            let userName =screen.getByText(/Aaron Miles/);
            expect(userName).toBeInTheDocument();
        });
       
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledWith(url);
    });

    it("delete user using delete icon", async () => {
        let userName =screen.queryByText(/Aaron Miles/);
        expect(userName).toBeInTheDocument()
        let deleteButton =screen.getByTestId("1_delete");
        userEvent.click(deleteButton);
        await waitFor(() => {
            let userName =screen.queryByText(/Aaron Miles/);
            expect(userName).not.toBeInTheDocument()
        });
         
    });
    it("delete All users using delete all button", async () => {
        let checkAll =screen.getByTestId("check_all");
        expect(checkAll.checked).toEqual(false)
        fireEvent.click(checkAll);
        expect(checkAll.checked).toEqual(true)
        await waitFor(()=>{
            let deleteButton =screen.getByTestId("delete_all");
            userEvent.click(deleteButton);
        })
        await waitFor(() => {
            let rowCount =screen.queryAllByTestId("user_row");
            expect(rowCount.length).toBeLessThan(1);
        });
         
        
    });
    it("delete only checked users using delete all button", async () => {
        let checkOne =screen.getByTestId("checkbox_1");
        expect(checkOne.checked).toEqual(false)
        fireEvent.click(checkOne);
        expect(checkOne.checked).toEqual(true)
        let checkTwo =screen.getByTestId("checkbox_2");
        expect(checkTwo.checked).toEqual(false)
        fireEvent.click(checkTwo);
        expect(checkTwo.checked).toEqual(true)
        await waitFor(()=>{
            let deleteButton =screen.getByTestId("delete_all");
            userEvent.click(deleteButton);
        })
        await waitFor(() => {
            let rowCount =screen.queryAllByTestId("user_row");
            expect(rowCount.length).toEqual(1);
        });
         
        
    });
    it("Check Pagination buttons and page numbers are displayed", async () => {
        let firstPage =screen.getByTestId("firstPage_button");
        expect(firstPage).toBeInTheDocument()
        let previousPage =screen.getByTestId("previousPage_button");
        expect(previousPage).toBeInTheDocument()
        let nextpage =screen.getByTestId("nextPage_button");
        expect(nextpage).toBeInTheDocument()
        let LastPage =screen.getByTestId("LastPage_button");
        expect(LastPage).toBeInTheDocument()
        let pageNo =screen.getByTestId("pageNumber_1");
        expect(pageNo).toBeInTheDocument()
    });
  
}) 

describe("Modal Component",()=>{
    beforeEach(()=>{
        render( <Provider store={store}>
                <UserTable/>
                <Modal 
                    open={true} 
                    title={"Edit User"}    >
                </Modal>
        </Provider>)
    })
    it("Modal title ,update and delete buttons are displayed", async () => {
        let title =screen.queryByText(/Edit User/);
        expect(title).toBeInTheDocument()
        let cancelButton =screen.getByTestId("delete_id");
        expect(cancelButton).toBeInTheDocument()
        let updateButton =screen.getByTestId("update_id");
        screen.debug
        expect(updateButton).toBeInTheDocument()
    });
    it("Form fields are displayed", async () => {
        let editButton =screen.getByTestId("1_edit");
        userEvent.click(editButton)
        render( <Provider store={store}>
                <Modal 
                    open={true} 
                    title={"Edit User"}>
                </Modal>
            </Provider>)
        
        await waitFor(()=>{
            let nameInput = screen.getByPlaceholderText("Enter Name");
            expect(nameInput).toBeInTheDocument()
            let emailInput =screen.getByPlaceholderText("Enter Email");
            expect(emailInput).toBeInTheDocument()
            let roleInput =screen.getByPlaceholderText("Enter Role");
            expect(roleInput).toBeInTheDocument()
        })
        
    });

    /// test case for changing the value of input


})