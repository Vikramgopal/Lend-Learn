import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MembersList from "./components/members/MembersList";
import MembersForm from "./components/members/MembersForm";
import BooksForm from "./components/books/BooksForm";
import TransactionForm from "./components/transactions/TransactionForm";
import AddStaff from "./components/staffs/AddStaff";
import Piechart from "./components/datalist/Piechart";
import TopBorrower from "./components/datalist/TopBorrower";
import OverdueTransaction from "./components/datalist/OverdueTransaction";
import BooksList from "./components/books/BooksList";
import TransactionsList from "./components/transactions/TransactionsList";
import StaffsList from "./components/staffs/StaffsList";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Login = React.lazy(() => import("./pages/Login"));
const AppLayout = React.lazy(() => import("./pages/AppLayout"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));

function App() {
  const [membersList, setMembersList] = useState([]); // To store the list of members
  const [booksList, setBooksList] = useState([]); // To store the list of members
  const [transactionsList, setTransactionsList] = useState([]); // To store the list of members

  const [staffList, setStaffList] = useState([
    {
      name: "Vikram",
      email: "vikram@login.com",
      staffId: "ST-1",
      phoneNumber: "4152636985",
      role: "Admin",
      password: "Vikram@123",
    },
  ]); // Store staff members
  const [StaffCreate, setStaffCreate] = useState(false);

  return (
    <AuthProvider staffList={staffList}>
      <Router>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Login staffList={staffList} />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="memberslist" />} />

              <Route
                path="memberslist"
                element={<MembersList membersList={membersList} />}
              />
              <Route
                path="bookslist"
                element={<BooksList booksList={booksList} />}
              />
              <Route
                path="transactionslist"
                element={
                  <TransactionsList transactionsList={transactionsList} />
                }
              />
              <Route
                path="staffslist"
                element={<StaffsList staffList={staffList} />}
              />
              <Route
                path="memberform"
                element={
                  <MembersForm
                    membersList={membersList}
                    setMembersList={setMembersList}
                  />
                }
              />
              <Route
                path="bookform"
                element={
                  <BooksForm
                    booksList={booksList}
                    setBooksList={setBooksList}
                  />
                }
              />
              <Route
                path="transactionform"
                element={
                  <TransactionForm
                    books={booksList}
                    members={membersList}
                    setBooksList={setBooksList}
                    transactionsList={transactionsList}
                    setTransactionsList={setTransactionsList}
                  />
                }
              />
              <Route
                path="addstaff"
                element={
                  <AddStaff
                    staffList={staffList}
                    setStaffList={setStaffList}
                    StaffCreate={StaffCreate}
                    setStaffCreate={setStaffCreate}
                  />
                }
              />
              <Route
                path="piechart"
                element={
                  <Piechart
                    booksList={booksList}
                    transactionsList={transactionsList}
                  />
                }
              />
              <Route
                path="topborrower"
                element={
                  <TopBorrower
                    transactionsList={transactionsList}
                    members={membersList}
                  />
                }
              />
              <Route
                path="overduetransaction"
                element={
                  <OverdueTransaction
                    members={membersList}
                    transactionsList={transactionsList}
                  />
                }
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
export default App;
