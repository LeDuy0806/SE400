package main

import (
    "fmt"
    "math/rand"
    "net/http"
    "os"
)

func handler(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    fmt.Fprintf(w, "Hello, %s!", name) // Error: no input validation
}

func Function() {
    // Error: unsafe input handling
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)

    // Error: no error checking
    file, _ := os.Open("example.txt") // Error: no error checking
    defer file.Close()

    // Error: sensitive information not encrypted
    password := "mysecretpassword" // Error: sensitive information not encrypted
    fmt.Println("Password:", password)

    // Error: SSL not configured
    client := &http.Client{
        Transport: http.DefaultTransport, // Error: SSL not configured
    }
    client.Get("http://example.com")

    // Error: unsafe, should use crypto/rand
    rand.Seed(1) // Error: unsafe, should use crypto/rand
    num := rand.Intn(100)
    println(num)
}
