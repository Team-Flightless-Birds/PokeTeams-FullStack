<?php
declare(strict_types=1);

namespace Google\Cloud\Samples\CloudSQL\MySQL;

use PDO;
use PDOException;
use RuntimeException;

class DBInitializer
{
    /**
     *  @param $username string username of the database user
     *  @param $password string password of the database user
     *  @param $dbName string name of the target database
     *  @param $connectionName string Cloud SQL instance name
     *  @param $socketDir string Full path to unix socket
     *  @param $conn_config array driver-specific options for PDO
     */
    public static function initUnixDatabaseConnection(
        string $username,
        string $password,
        string $dbName,
        string $connectionName,
        string $socketDir,
        array $conn_config
    ): PDO {
        try {
            # [START cloud_sql_mysql_pdo_create_socket]
            $username = 'dbconnector';
            $password = '';
            $dbName = 'pokeMain';
            $connectionName = 'poketeams:us-east4:poke-main';
            $socketDir = '/cloudsql';

            // Connect using UNIX sockets
            $dsn = sprintf(
                'mysql:dbname=%s;unix_socket=%s/%s',
                $dbName,
                $socketDir,
                $connectionName
            );

            // Connect to the database.
            $conn = new PDO($dsn, $username, $password, $conn_config);
            # [END cloud_sql_mysql_pdo_create_socket]
        } catch (TypeError $e) {
            throw new RuntimeException(
                sprintf(
                    'Invalid or missing configuration! Make sure you have set ' .
                    '$username, $password, $dbName, and $dbHost (for TCP mode) ' .
                    'or $connectionName (for UNIX socket mode). ' .
                    'The PHP error was %s',
                    $e->getMessage()
                ),
                (int) $e->getCode(),
                $e
            );
        } catch (PDOException $e) {
            throw new RuntimeException(
                sprintf(
                    'Could not connect to the Cloud SQL Database. Check that ' .
                    'your username and password are correct, that the Cloud SQL ' .
                    'proxy is running, and that the database exists and is ready ' .
                    'for use. For more assistance, refer to %s. The PDO error was %s',
                    'https://cloud.google.com/sql/docs/mysql/connect-external-app',
                    $e->getMessage()
                ),
                (int) $e->getCode(),
                $e
            );
        }

        return $conn;
    }
}