import java.sql.*;
import java.util.*;

public class DAO {
    
    private static Conexion conexion = new Conexion();

    public static String crearCita(Cita cita) {

        PreparedStatement st = null;
        Connection con = null;
        String msj = "";
        con = conexion.getConnection();

        try {
            String sql = "insert into citas values (?,?,?,?,?)";
            
            st = con.prepareStatement(sql);
            st.setString(1, cita.getID());
            st.setString(2, cita.getNombre());
            st.setString(3, cita.getFecha());
            st.setString(4, cita.getDoctor());
            st.setString(5, cita.getPruebas());

            if(st.executeUpdate() > 0){
                msj = "El usuario fue agregado";
            }
            else{
                msj = "No se pudo agregar el usuario";
            }
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        finally {
            if(st != null) {
                try {
                    st.close();
                } 
                catch (SQLException e) {
                    e.printStackTrace();
                }
                st = null;
            }
            try {
                con.close();
                System.out.println("conexion cerrada");
            } 
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        return msj;
    }

    public static List<Cita> dameCitas() {
        
        Statement st = null;
        Connection con = null;
        ResultSet rs = null;
        List<Cita> resultados = new ArrayList<Cita>();

        con = conexion.getConnection();

        try {
            String sql = "select * from citas";
            st = con.createStatement();
            rs = st.executeQuery(sql);
            while(rs.next()){
                Cita c = new Cita();

                c.setID(rs.getString("id"));
                c.setNombre(rs.getString("nombre"));
                c.setFecha(rs.getString("fecha"));
                c.setDoctor(rs.getString("doctor"));
                c.setPruebas(rs.getString("pruebas"));

                resultados.add(c);
            }  
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        finally {

            if(rs != null) {
                try {
                    rs.close();
                } 
                catch (SQLException e) {
                    e.printStackTrace();
                }
                rs = null;
            }

            if(st != null) {
                try {
                    st.close();
                }
                catch (SQLException e) {
                    e.printStackTrace();
                }
                st = null;
            }
            
            try {
                con.close();
                System.out.println("conexion cerrada");
            } 
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        return resultados;
    }

    public static String eliminarCita(String id){
        
        PreparedStatement st = null;
        Connection con = null;
        String msj = "";

        con = conexion.getConnection();

        try{

            String sql = "delete from citas where id = ?";
            st = con.prepareStatement(sql);
            st.setString(1, id);

            if(st.executeUpdate() > 0) {
                msj = "El usuario fue eliminado";
            }
            else {
                msj = "No se pudo eliminado el usuario";
            }
        }
        catch(Exception e){
         
            e.printStackTrace();
        }
        finally{
            if(st != null){
                try {
                    st.close();
                } 
                catch (SQLException e) {
                    e.printStackTrace();
                }
                st = null;
            }
            try {
                con.close();
                System.out.println("conexion cerrada");
            } 
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        return msj;
    }
}
