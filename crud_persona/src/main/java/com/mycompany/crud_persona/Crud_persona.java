/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.crud_persona;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author USUARIO
 */
public class Crud_persona {

    public static void main(String[] args) {
        
        String hostName = "crud.cf228my08c7j.us-east-1.rds.amazonaws.com";
        String jdbcUrl = "jdbc:mysql://" + hostName + ":3306/crud?useSSL=false&serverTimezone=UTC";
        String username = "admin";
        String password = "lionelhuamani19";

        Connection con = null;

        try {
            con = DriverManager.getConnection(jdbcUrl, username, password);
            if (con != null) {
                System.out.println("Conexion exitosa");
            }
        } catch (SQLException e) {
            System.out.println("Error al conectar la base de datos " + e);
        }
    }
}
    

