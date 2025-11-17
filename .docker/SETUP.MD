### Kafka

- Install from docs  

    apache/kafka:4.1.1

    https://kafka.apache.org/quickstart

- Find kafka-topics.sh

    find / -name "kafka-topics.sh"

    /opt/kafka/bin/kafka-topics.sh

- Export path to access global

    export PATH=$PATH:/opt/kafka/bin

- Testing

    /opt/kafka/bin/kafka-topics.sh --list --bootstrap-server localhost:9092

- Add topic to testing

    /opt/kafka/bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092

- Write events

    /opt/kafka/bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092

- Read events

    /opt/kafka/bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092


### Kafka GUI

     sudo docker run -it -p 8080:8080 -e DYNAMIC_CONFIG_ENABLED=true provectuslabs/kafka-ui