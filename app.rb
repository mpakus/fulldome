require 'sinatra/base'

set :logging, true

class SinatraBootstrap < Sinatra::Base
  get '/' do
    erb :index
  end

  post '/ping' do
    erb :ping, locals: {name: params[:name]}
  end

  run! if app_file == $0
end

