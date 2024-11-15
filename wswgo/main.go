package main

import (
	"fmt"
	"os"
	"time"

	whatsapp "github.com/Rhymen/go-whatsapp"
)

func main() {
	wac, _ := whatsapp.NewConn(20 * time.Second)

	qrChan := make(chan string)
	go func() {
		fmt.Printf("qr code: %v\n", <-qrChan)
		//show qr code or save it somewhere to scan
	}()
	_, _ = wac.Login(qrChan)

	wac.AddHandler(myHandler{})
}

type myHandler struct{}

func (myHandler) HandleError(err error) {
	fmt.Fprintf(os.Stderr, "%v", err)
}

func (myHandler) HandleTextMessage(message whatsapp.TextMessage) {
	fmt.Println(message)
}

func (myHandler) HandleImageMessage(message whatsapp.ImageMessage) {
	fmt.Println(message)
}

func (myHandler) HandleDocumentMessage(message whatsapp.DocumentMessage) {
	fmt.Println(message)
}

func (myHandler) HandleVideoMessage(message whatsapp.VideoMessage) {
	fmt.Println(message)
}

func (myHandler) HandleAudioMessage(message whatsapp.AudioMessage) {
	fmt.Println(message)
}

func (myHandler) HandleJsonMessage(message string) {
	fmt.Println(message)
}

func (myHandler) HandleContactMessage(message whatsapp.ContactMessage) {
	fmt.Println(message)
}

func (myHandler) HandleBatteryMessage(message whatsapp.BatteryMessage) {
	fmt.Println(message)
}

func (myHandler) HandleNewContact(contact whatsapp.Contact) {
	fmt.Println(contact)
}
