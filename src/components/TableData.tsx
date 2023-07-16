import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Box, Button, Flex } from "@mantine/core";
import { ApiContext } from "./ApiProvider";
import { apiLogout } from "./services/Api";


const TableData = (props: any) => {
  const navigate = useNavigate();
  const [responseTableData, setResponseTableData] = useState<any[]>([]);
  const { isPutApiSuccess } = useContext(ApiContext);
  const storedAccessToken = localStorage.getItem("accessToken");
  const accessToken = storedAccessToken
    ? storedAccessToken.replace(/"/g, "")
    : null;

  useEffect(() => {
    if (isPutApiSuccess) {
      let params = {
        page: 0,
        size: 1,
      };
      let getApiUrl = `https://asia-northeast1-willeder-official.cloudfunctions.net/api/lists?${params?.page}&${params?.size}`;

      let headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      axios
        .get(getApiUrl, { headers, params })
        .then((res) => {
          setResponseTableData(res?.data?.data?.data);
        })
        .catch((error) => {});
    }
  }, [isPutApiSuccess]);

  const handleLogout = () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    axios
      .put(apiLogout, null, { headers })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.errorMessage)
          window.alert(err.response.data.errorMessage);
        else window.alert("Something went wrong..");
      });
  };
  return (
    <Box>
      <Flex mih={50} gap='md' justify='flex-end' align='center' direction='row'>
        <Button onClick={handleLogout}> Logout</Button>
      </Flex>

      <Box
        style={{
          background: "#969696",
          padding: "172px, 470px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Table>
          <thead style={{ background: "black" }}>
            <tr>
              <th>Name</th>
              <th>Airline</th>
              <th>Trips</th>
              <th>HeadQuaters</th>
            </tr>
          </thead>
          <tbody>
            {responseTableData?.map((passenger: any) => (
              <tr key={passenger._id}>
                <td>{passenger.name}</td>
                <td>{passenger.airline[0]?.name}</td>
                <td>{passenger.trips}</td>
                <td>{passenger.airline[0]?.head_quaters}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TableData;
