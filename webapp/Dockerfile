FROM python:3
COPY ./backend /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 80
ENTRYPOINT ["flask"]
CMD ["run", "--host=0.0.0.0", "--port=80"]