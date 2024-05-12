import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { IEmpresa } from "../../../types/IEmpresa";
import Swal from "sweetalert2";
import { setDataTable } from "../../../redux/slices/TablaReducer";
import { Button } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import TableGeneric from "../../ui/GenericTable/GenericTable";
import { UsuarioService } from "../../../services/UsuarioService";
import { Loader } from "../../ui/Loader/Loader";


const API_URL = import.meta.env.VITE_API_URL;

export const SeccionUsuarios = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const usuarioService = new UsuarioService(API_URL + "/users");
  const dispatch = useAppDispatch();

  const ColumnsUsuario = [
    {
      label: "id",
      key: "id",
      render: (empresa: IEmpresa) => (empresa?.id ? empresa.id : 0),
    },
    {
      label: "Nombre",
      key: "name",
    },
    { label: "Acciones", key: "actions", },
    { label: "Estado", key: "active" }
  ]

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `¿Seguro que quieres eliminar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await usuarioService.delete(id).then(() => {
          getUsuario();
        });
      }
    });
  };

  const getUsuario = async () => {
    await usuarioService.getAll().then((usuarioData) => {
      dispatch(setDataTable(usuarioData));
      setLoading(false);
    });
  };

  const getEmpresa = async () => {
    await usuarioService.getAll().then((usuarioData) => {
      dispatch(setDataTable(usuarioData));
      setLoading(false);
      console.log(usuarioData);
    });
  };

  useEffect(() => {
    setLoading(true);
    getEmpresa();
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            padding: ".4rem",
            display: "flex",
            justifyContent: "flex-end",
            width: "90%",
          }}
        >
        </div>
        {/* Mostrar indicador de carga mientras se cargan los datos */}
        {loading ? (
          <Loader />
        ) : (
          // Mostrar la tabla de personas una vez que los datos se han cargado
          <TableGeneric<IEmpresa>
            handleDelete={handleDelete}
            columns={ColumnsUsuario}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
      {/* <ModalEmpresa
        getProductos={getEmpresa}
        openModal={openModal}
        setOpenModal={setOpenModal}
      /> */}
    </>
  );
}