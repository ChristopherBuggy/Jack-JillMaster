from tornado import websocket, web, ioloop, httpserver
import tornado
import json

players = {}
incomingMessage = ""

gameStateMessage = "WAITING_FOR_PLAYERS"



#Extends the tornado websocket handler
class WSHandler(tornado.websocket.WebSocketHandler):
	def check_origin(self,origin):
		return True

	def open(self):
		print("Websocket opened")
		print('Client IP:' + self.request.remote_ip)


	def on_message(self, message):
		self.write_message("hello from server...")
		#self.sendToAll()
		#self.sendToAllButPlayer(message)
		if len(players) < 1:
			players[self.request.remote_ip] = self
			print(len(players))
			self.handleMessage(message)

		elif len(players) == 1 and len(players) < 2:
			players[self.request.remote_ip] = self
			print(len(players))
			self.sendGameStart(message)

		elif len(players) >= 2:
			m = json.loads(message)
			#if game is full and the players request is to join
			if m['request'] == "join":
				self.sendGameFull(m)

			#if game is in progress and the player clicked somewhere on the screen
			if m['request'] == "click":
				#for some reason calling sendToAllButPlayer wouldn't work
				#but if I do what sendToAllButPlayer does here it works just fine
				#self.sendToAllButPlayer(self, m)
				for i in players:
					if i is not self.request.remote_ip:
						msg = dict()
						msg["type"] = "click"
						msg["Pos"] = {"X":m["Pos"]["X"], "Y":m["Pos"]["Y"]}
						msg=json.dumps(msg)
						players[i].write_message(msg)


		
	def sendToAll(self):
		for i in players:
			players[i].write_message("Hello"+i)
			print("Hello"+i)
	#no longer works...
	def sendToAllButPlayer(self, m):
		for i in players:
			if i is not self.request.remote_ip:
				msg = dict()
				msg["type"] = "click"
				msg["Pos"] = {"X":m["Pos"]["X"], "Y":m["Pos"]["Y"]}
				msg=json.dumps(msg)
				players[i].write_message(msg)
				print("Heyo " + i)

	def handleMessage(self, message):
		msg=dict()
		#load the incoming message
		incomingMessage = json.loads(message)
		print(incomingMessage)
		
		msg["type"]="join"#set your type here
		msg["data"]="waiting for other people" #set your message data here
		msg=json.dumps(msg)
		print(msg)

		for i in players:
			players[i].write_message(msg)
			#send msg back

	def sendGameStart(self, message):
		msg=dict()
		#load the incoming message
		incomingMessage = json.loads(message)
		print(incomingMessage)

		msg["type"]="game start"#set your type here
		msg["data"]="Game starting now" #set your message data here
		msg=json.dumps(msg)
		print(msg)

		for i in players:
			players[i].write_message(msg)


	def sendGameFull(self,message):
		lateJoiners = {}
		lateJoiners[self.request.remote_ip] = self

		msg=dict()
		#load the incoming message
		incomingMessage = json.loads(message)
		print(incomingMessage)

		msg["type"]="game_state"#set your type here
		msg["data"]="Game is full. Try again later" #set your message data here
		msg=json.dumps(msg)

		print(msg)
		#keepa list of players that try to join after the game has started. Could probably do something with it in an actual game
		for i in lateJoiners:
			lateJoiners[i].write_message("Game is full. please wait")


app = tornado.web.Application([
	(r'/test', WSHandler,)
	])

if __name__ == '__main__':
	#what is 8080?a port
	app.listen(8080)
	tornado.ioloop.IOLoop.instance().start()