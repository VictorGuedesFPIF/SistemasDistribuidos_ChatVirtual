export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: "REGISTER_REQUEST" });
    
    try {
      // Simulação de chamada API - substitua por sua API real
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            user: {
              id: Math.random().toString(36).substr(2, 9),
              name: userData.name,
              email: userData.email
            }
          });
        }, 1000);
      });
  
      dispatch({ 
        type: "REGISTER_SUCCESS", 
        payload: { user: response.user } 
      });
      
      return true;
    } catch (error) {
      dispatch({ 
        type: "REGISTER_FAILURE", 
        payload: { error: error.message } 
      });
      return false;
    }
  };