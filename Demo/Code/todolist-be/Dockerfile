# Stage 1: Build Stage
FROM golang:1.23-alpine AS build

# Set the Current Working Directory inside the container
WORKDIR /app

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server

# Stage 2: Runtime Stage
FROM alpine:latest AS run

# Set up a non-root user for better security
#RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the pre-built binary from the builder stage
#COPY --from=builder /todolist-be /todolist-be

# Set user and working directory
#USER appuser
#WORKDIR /home/appuser

# Copy the pre-built binary from the builder stage
COPY --from=build /app/server /app/server

# Set working directory
WORKDIR /app

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["/app/server"]
