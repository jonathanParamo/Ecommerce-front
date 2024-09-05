import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, updateCategory } from '../features/categories/categoriesSlice';
import { Container, Table, Th, Td, Button, ContainerButton, ModalContainer, Modal, Input, FormGroup, Title, ButtonContainer } from '../utils/categoryView'
import { ToastContainer, toast } from "react-toastify";

const CategoriesManager = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [subcategories, setSubcategories] = useState('');
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    if (needsUpdate) {
      dispatch(fetchCategories());
      setNeedsUpdate(false);
    }
  }, [dispatch, needsUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      name,
      subcategories: subcategories.split(',').map(subcat => subcat.trim()),
    };

    try {
      if (editMode && categoryId) {
        // editar la categoría existente
        await dispatch(updateCategory({ id: categoryId, ...categoryData })).unwrap();
        toast("¡Categoría actualizada con éxito!");
      } else {
        // crear una nueva categoría
        await dispatch(createCategory(categoryData)).unwrap();
        toast("¡Categoría creada con éxito!");
      }

      setNeedsUpdate(true);
      setShowModal(false);
      resetForm()
    } catch (error) {
      toast.error("Something went wrong!", error );
    }
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setCategoryId(category._id);
    setName(category.name);
    setSubcategories(category.subcategories.join(', '));
    setShowModal(true);
  };

  const resetForm = () => {
    setName('');
    setSubcategories('');
    setEditMode(false);
    setCategoryId(null);
  };

  return (
    <Container>
      <Title>Categorias</Title>
      {status === 'loading' && <p>Cargando...</p>}
      {status === 'failed' && <p>Error al cargar las categorías</p>}
      {status === 'succeeded' && (
        <Table>
          <thead>
            <tr>
              <Th>Categoría</Th>
              <Th>Subcategorías</Th>
              <Th>Editar</Th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <Td>{cat.name}</Td>
                <Td>{cat.subcategories.join(', ')}</Td>
                <Td onClick={() => handleEdit(cat)}>Editar </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {showModal && (
        <ModalContainer>
          <Modal>
            <h2>{editMode ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h2>
            <FormGroup>
              <label>Nombre de la Categoría:</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Subcategorías (separadas por coma):</label>
              <Input
                type="text"
                value={subcategories}
                onChange={(e) => setSubcategories(e.target.value)}
              />
            </FormGroup>
            <ButtonContainer>
              {editMode ?
                <Button onClick={handleSubmit}>Actualizar</Button>
                :
                <Button onClick={handleSubmit}>Crear</Button>
              }
              <Button onClick={() => { setShowModal(false); resetForm(); }}>Cancelar</Button>
            </ButtonContainer>
          </Modal>
        </ModalContainer>
      )}

      <ContainerButton>
        <Button onClick={() => setShowModal(true)}>Crear Categoría</Button>
      </ContainerButton>
      <ToastContainer />
    </Container>
  );
};

export default CategoriesManager;
