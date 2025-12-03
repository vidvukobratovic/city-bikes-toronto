-- Main.hs
module Main where

import Network.HTTP.Client (Manager, newManager)
import Network.HTTP.Client.TLS (tlsManagerSettings)
import Network.Wai.Handler.Warp (run)
import Api (app)
import Config (Config(..), defaultConfig)

main :: IO ()
main = do
  putStrLn "Starting City Bikes Backend..."
  putStrLn $ "Server running on port " ++ show (port defaultConfig)
  
  -- Create HTTP manager for making requests
  manager <- newManager tlsManagerSettings
  
  -- Start the server
  run (port defaultConfig) (app manager defaultConfig)

